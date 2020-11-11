import {useEffect} from 'react'

export function useLogConversion() {
  useEffect(logConversion, [])
}

export function logConversion() {
  if (!globalThis.gtag) return

  globalThis.gtag('event', 'conversion', {
    send_to: 'AW-480060544/XsOyCMjf3egBEIDJ9OQB'
  })
}
