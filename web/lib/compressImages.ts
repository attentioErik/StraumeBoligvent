/** Client-side image compression for the contact form (Basin email attachment limit). */

export const MAX_EDGE = 1920
export const JPEG_QUALITY = 0.8
/** Headroom under Basin's 7.5 MB "Attach Files Directly to Emails" limit. */
export const MAX_TOTAL_BYTES = 7 * 1024 * 1024
export const MAX_FILES = 15

const IMAGE_TYPE = /^image\//i
const HEIC_TYPE = /^image\/hei[cf]$/i
const HEIC_EXT = /\.hei[cf]$/i

export function isImageFile(file: File): boolean {
  if (IMAGE_TYPE.test(file.type)) return true
  // Some browsers leave type empty or generic for HEIC/HEIF
  return HEIC_EXT.test(file.name)
}

export function scaleToMax(width: number, height: number, maxEdge = MAX_EDGE): { width: number; height: number } {
  const longest = Math.max(width, height)
  if (longest <= 0 || longest <= maxEdge) return { width, height }
  const scale = maxEdge / longest
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  }
}

export function totalSize(files: File[]): number {
  return files.reduce((sum, f) => sum + f.size, 0)
}

function jpgName(name: string): string {
  const trimmed = name.trim() || 'bilde'
  const base = trimmed.includes('.') ? trimmed.replace(/\.[^.]+$/u, '') : trimmed
  return `${base || 'bilde'}.jpg`
}

async function decodeImage(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' })
    } catch {
      // HEIC often fails here in Chromium; try the <img> path next
    }
  }
  return loadHtmlImage(file)
}

function loadHtmlImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error(HEIC_TYPE.test(file.type) || HEIC_EXT.test(file.name) ? 'heic-decode-failed' : 'decode-failed'))
    }
    img.src = url
  })
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve, reject) => {
    if (typeof canvas.toBlob === 'function') {
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality)
      return
    }
    try {
      const dataUrl = canvas.toDataURL('image/jpeg', quality)
      const bin = atob(dataUrl.split(',')[1] ?? '')
      const bytes = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
      resolve(new Blob([bytes], { type: 'image/jpeg' }))
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * Compress one image: max 1920px on the long side, JPEG quality 0.8.
 * Non-images are returned unchanged. If decoding or encoding fails (typical for
 * HEIC in non-Safari browsers), the original file is returned so submit is not blocked.
 */
export async function compressImageFile(file: File): Promise<File> {
  if (!isImageFile(file)) return file

  try {
    const source = await decodeImage(file)
    try {
      const { width, height } = scaleToMax(source.width, source.height)
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) return file
      // Flatten transparency when converting PNG/WebP/HEIC to JPEG
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(source, 0, 0, width, height)
      const blob = await canvasToJpeg(canvas, JPEG_QUALITY)
      if (!blob || blob.size === 0) return file
      // Already-small JPEGs can get slightly larger after a re-encode
      if (blob.size >= file.size && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
        return file
      }
      return new File([blob], jpgName(file.name), { type: 'image/jpeg', lastModified: Date.now() })
    } finally {
      if ('close' in source && typeof source.close === 'function') source.close()
    }
  } catch {
    return file
  }
}

/** Compress images sequentially to limit peak memory on phones. */
export async function compressFiles(files: File[]): Promise<File[]> {
  const out: File[] = []
  for (const file of files) {
    out.push(await compressImageFile(file))
  }
  return out
}
