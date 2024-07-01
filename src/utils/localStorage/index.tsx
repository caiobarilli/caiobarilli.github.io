const APP_KEY = 'FRONTEND'

export const getStorageItem = (key: string) => {
  if (typeof window === 'undefined') return
  const data = window.localStorage.getItem(`${APP_KEY}_${key}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return JSON.parse(data!)
}

export const setStorageItem = (key: string, value: string[] | boolean) => {
  if (typeof window === 'undefined') return
  const data = JSON.stringify(value)
  return window.localStorage.setItem(`${APP_KEY}_${key}`, data)
}

export const removeStorageItem = (key: string) => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(`${APP_KEY}_${key}`)
}
