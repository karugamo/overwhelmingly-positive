import {useEffect} from 'react'

export function useLogConversion(type: ConversionType) {
  useEffect(() => logConversion(type), [])
}

export function logConversion(type: ConversionType) {
  if (!globalThis.gtag) return

  globalThis.gtag('event', 'conversion', {
    send_to: type
  })
}

export enum ConversionType {
  ModalOpen = 'AW-480060544/At3LCLS4-ugBEIDJ9OQB'
}

export function trackClick(url: string, type: ConversionType) {
  if (!globalThis.gtag) {
    window.open(url)
    return
  }

  globalThis.gtag('event', 'conversion', {
    send_to: type,
    event_callback: () => window.open(url)
  })

  return false
}
