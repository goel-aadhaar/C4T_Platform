import type { CSSProperties, SelectHTMLAttributes } from 'react'
import { Icon } from '../core/Icon'
import { controlBase } from './Input'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options?: readonly (string | SelectOption)[]
  invalid?: boolean
  /** Renders as a leading empty-value option, so "nothing chosen" is real. */
  placeholder?: string
  style?: CSSProperties
}

/**
 * A native `<select>` with the caret drawn over it.
 *
 * Native, not a custom listbox: it gets the platform picker on mobile, works
 * with keyboard and voice control for free, and needs no JavaScript. The only
 * custom part is `appearance: none` plus the chevron, which is `pointer-events:
 * none` so clicks fall through to the control underneath.
 */
export function Select({
  options = [],
  invalid,
  placeholder,
  style,
  className,
  ...rest
}: SelectProps) {
  return (
    <span style={{ position: 'relative', display: 'block' }}>
      <select
        className={['c4t-input', className].filter(Boolean).join(' ')}
        aria-invalid={invalid ? true : undefined}
        style={{
          ...controlBase,
          appearance: 'none',
          paddingRight: 40,
          cursor: 'pointer',
          ...style,
        }}
        {...rest}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value
          const label = typeof option === 'string' ? option : option.label
          return (
            <option key={value} value={value}>
              {label}
            </option>
          )
        })}
      </select>
      <Icon
        name="chevron-down"
        size={18}
        style={{
          position: 'absolute',
          right: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
        }}
      />
    </span>
  )
}
