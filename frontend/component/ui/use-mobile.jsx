import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // ✅ Prevent running during SSR (no window)
    if (typeof window === 'undefined') return

 const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const onChange = (event) => {
      setIsMobile(event.matches)
    }

    // Initial check
    setIsMobile(mql.matches)

    // Add listener — use modern syntax with fallback for Safari
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange)
    } else {
      // Safari < 14 support
      mql.addListener(onChange)
    }

    // Cleanup
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange)
      } else {
        mql.removeListener(onChange)
      }
    }
  }, [])

  return isMobile
}

