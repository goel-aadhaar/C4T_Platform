import type { CSSProperties, ReactNode } from 'react'

export interface FieldProps {
  label?: string
  /** Helper text under the control. Hidden when `error` is set. */
  hint?: string
  error?: string
  required?: boolean
  /** Must match the control's `id`, or the label clicks nothing. */
  htmlFor?: string
  children: ReactNode
  style?: CSSProperties
  className?: string
}

/**
 * Label + control + hint or error.
 *
 * PORT NOTE. The source rendered a bare asterisk for `required`, which a screen
 * reader announces as "star" or skips entirely. The asterisk is now
 * `aria-hidden` with a visually hidden "(required)" beside it, so the
 * requirement is conveyed in both channels. The control itself still carries the
 * real `required` attribute — this is the visible affordance, not the semantics.
 *
 * `error` replaces `hint` rather than stacking, as in the source: two lines of
 * competing guidance under one input is worse than one.
 */
export function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  style,
  className,
}: FieldProps) {
  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}
    >
      {label ? (
        <label
          htmlFor={htmlFor}
          style={{
            fontSize: 'var(--type-label-size)',
            lineHeight: 'var(--type-label-line)',
            fontWeight: 'var(--fw-medium)',
            color: 'var(--text-primary)',
          }}
        >
          {label}
          {required ? (
            <>
              <span aria-hidden="true" style={{ color: 'var(--status-error-fg)', marginLeft: 3 }}>
                *
              </span>
              <span className="c4t-visually-hidden"> (required)</span>
            </>
          ) : null}
        </label>
      ) : null}

      {children}

      {error ? (
        <span
          role="alert"
          style={{ fontSize: 'var(--type-caption-size)', color: 'var(--status-error-fg)' }}
        >
          {error}
        </span>
      ) : hint ? (
        <span style={{ fontSize: 'var(--type-caption-size)', color: 'var(--text-muted)' }}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}
