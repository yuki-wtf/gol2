import { useState } from 'react'
import copy from 'copy-to-clipboard'

type Return = [
  typeof copy,
  {
    readonly value: string | null
    readonly success: boolean | null
  }
]

export default function useCopyToClipboard(): Return {
  const [value, setValue] = useState<string>(null)
  const [success, setSuccess] = useState(false)

  const copyToClipboard: typeof copy = (text, options) => {
    const result = copy(text, options)

    if (result) setValue(text)

    setSuccess(result)

    setTimeout(() => {
      setSuccess(false)
    }, 2000)

    return result
  }

  return [
    copyToClipboard,
    {
      value,
      success,
    },
  ]
}
