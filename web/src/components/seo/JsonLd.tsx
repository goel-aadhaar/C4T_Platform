export interface JsonLdProps {
  /** One schema.org object, or several to emit as a graph. */
  schema: object | readonly object[]
}

/**
 * Emits JSON-LD.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * WHY `<script>` AND NOT `next/script`
 *
 * `next/script` is for executable JavaScript with a loading strategy.
 * `application/ld+json` is inert data that crawlers read out of the served HTML,
 * so it must be present in the initial response — a deferred script tag would
 * work for Google (which executes JS) and be invisible to most other crawlers
 * and to link unfurlers. A plain tag in a Server Component is the correct tool.
 *
 * THE `dangerouslySetInnerHTML` IS NOT OPTIONAL. React escapes text children,
 * which turns `"` into `&quot;` inside the script body and produces invalid JSON.
 * The name is doing its job as a warning, so: every value that reaches here comes
 * from the route registry or the content modules, both of which are in-repo
 * TypeScript. NOTHING user-supplied may be passed to this component. If a future
 * schema needs to carry customer input, escape `<`, `>` and `&` first — a `</script>`
 * inside a JSON string ends the tag early and everything after it becomes markup.
 * ──────────────────────────────────────────────────────────────────────────
 */
export function JsonLd({ schema }: JsonLdProps) {
  const payload = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Defence in depth for the `</script>` case described above, even
          // though no current caller can reach it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}
