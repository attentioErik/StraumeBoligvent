interface ReviewCardProps {
  text: string
  name: string
  role: string
  stars?: number
}

export default function ReviewCard({ text, name, role, stars = 5 }: ReviewCardProps) {
  return (
    <div
      className="rcard reveal"
      style={{
        background: 'var(--off)',
        border: '1px solid var(--ll)',
        borderRadius: 6,
        padding: 36,
        position: 'relative',
        transition: 'transform 0.25s, box-shadow 0.25s',
      }}
    >
      {/* Big quote mark */}
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '5rem',
          lineHeight: 1,
          color: 'var(--amber)',
          opacity: 0.25,
          position: 'absolute',
          top: 12,
          left: 28,
          userSelect: 'none',
        }}
      >
        &ldquo;
      </div>

      {/* Stars */}
      <div
        style={{
          color: 'var(--amber)',
          fontSize: '0.875rem',
          letterSpacing: 3,
          marginBottom: 20,
        }}
      >
        {'★'.repeat(stars)}
      </div>

      <p
        style={{
          fontSize: '0.915rem',
          color: 'var(--body)',
          lineHeight: 1.75,
          fontStyle: 'italic',
          marginBottom: 28,
          fontWeight: 300,
          position: 'relative',
          zIndex: 1,
        }}
      >
        &laquo;{text}&raquo;
      </p>

      <div>
        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)' }}>{name}</div>
        <div
          style={{
            fontSize: '0.78rem',
            color: 'var(--sec)',
            marginTop: 4,
            letterSpacing: '0.04em',
          }}
        >
          {role}
        </div>
      </div>

      <style>{`
        .rcard:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(20,16,8,0.09);
        }
      `}</style>
    </div>
  )
}
