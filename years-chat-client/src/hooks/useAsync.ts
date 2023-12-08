import { useEffect } from 'react'
import { useAsyncAction } from './useAsyncAction'

export function useAsync (fn: (params: any) => Promise<any>, params?: any) {
  const {
    loading,
    error,
    value,
    trigger
  } = useAsyncAction(fn)

  useEffect(() => {
    trigger(params)
  }, [])

  return { loading, error, value }
}
