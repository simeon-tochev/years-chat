import { useState, useCallback } from 'react'

export function useAsyncAction (fn: (params?: any) => Promise<any>) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const [value, setValue] = useState<any>(undefined)

  const trigger = useCallback(async (params?: any) => {
    setLoading(true)
    setError(undefined)
    try {
      const result = await fn(params)
      setLoading(false)
      setValue(result)
    } catch (e: any) {
      setLoading(false)
      setError(e)
    }
  }, [fn])

  const clearValue = useCallback(() => {
    setValue(undefined)
  }, [value])

  return { trigger, loading, error, value, clearValue }
}
