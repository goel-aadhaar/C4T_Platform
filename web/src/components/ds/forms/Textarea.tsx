import type { CSSProperties, TextareaHTMLAttributes } from 'react'
import { controlBase } from './Input'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
  style?: CSSProperties
}

/**
 * A multi-line control sharing `controlBase` with Input, so the two match on
 * height, radius, border and focus ring.
 *
 * `resize: vertical` only — horizontal resize breaks the form grid.
 */
export function Textarea({ rows = 5, invalid, style, className, ...rest }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={['c4t-input', className].filter(Boolean).join(' ')}
      aria-invalid={invalid ? true : undefined}
      style={{ ...controlBase, resize: 'vertical', ...style }}
      {...rest}
    />
  )
}
