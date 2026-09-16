import Script from 'next/script'

export default function GoogleReviews() {
  return (
    <>
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      <div className="elfsight-app-f72eef5c-9e8b-40c6-904b-dd6484fdcb3d" data-elfsight-app-lazy></div>
    </>
  )
}
