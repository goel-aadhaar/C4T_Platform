import type { CSSProperties, InputHTMLAttributes } from 'react'
import { Icon } from '../core/Icon'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Lucide icon name rendered inside the left edge. */
  iconLeft?: string
  /** Marks the control invalid — red border + aria-invalid. */
  invalid?: boolean
  disabled?: boolean
  style?: CSSProperties
  className?: string
}

/**
 * Shared control geometry for Input, Textarea and Select, so the three line up
 * in a form row. Exported because the other two consume it — the design system
 * keeps it unexposed, but in TypeScript sharing the object beats restating it.
 */
export const controlBase: CSSProperties = {
  width: '100%',
  minHeight: 48,
  padding: '12px 14px',
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--type-body-md-size)',
  lineHeight: 1.4,
  color: 'var(--text-primary)',
  background: 'var(--surface-canvas)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-input)',
  transition: 'var(--transition-control)',
}

/**
 * A text control. Focus ring, placeholder colour and the invalid state all live
 * in the `.c4t-input` rules in tokens/interactions.css — never restyle them
 * here, and never suppress the focus ring.
 */
export function Input({ iconLeft, invalid, disabled, style, className, ...rest }: InputProps) {
  const input = (
    <input
      className={['c4t-input', className].filter(Boolean).join(' ')}
      aria-invalid={invalid ? true : undefined}
      disabled={disabled}
      style={{
        ...controlBase,
        paddingLeft: iconLeft ? 42 : 14,
        background: disabled ? 'var(--surface-sunken)' : controlBase.background,
        color: disabled ? 'var(--text-disabled)' : controlBase.color,
        ...style,
      }}
      {...rest}
    />
  )

  if (!iconLeft) return input

  return (
    <span style={{ position: 'relative', display: 'block' }}>
      <Icon
        name={iconLeft}
        size={18}
        style={{
          position: 'absolute',
          left: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
        }}
      />
      {input}
    </span>
  )
}
