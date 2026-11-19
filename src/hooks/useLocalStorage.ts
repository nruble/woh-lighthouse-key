import { useState, useEffect } from 'react'

type Options<T> = {
  serialize?: (value: T) => string
  deserialize?: (raw: string) => T
}

export function useLocalStorageState<T>(
  key: string,
  initial: T,
  { serialize = JSON.stringify, deserialize = JSON.parse }: Options<T> = {}
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? deserialize(raw) : initial
    } catch {
      return initial // storage unavailable, or the saved data was invalid
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, serialize(value))
    } catch {
      // storage full or disabled: the app still works, it just won't persist
    }
  }, [key, value])

  return [value, setValue] as const
}