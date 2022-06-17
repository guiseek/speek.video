import { WithContext, Thing } from 'schema-dts'

export function createJsonLdScript<T extends Thing>(
  schema: WithContext<T>
): HTMLScriptElement {
  const scriptJsonLd = document.createElement('script')
  scriptJsonLd.type = 'application/ld+json'

  const jsonLd = JSON.stringify(schema)
  const textJsonLd = document.createTextNode(jsonLd)
  scriptJsonLd.appendChild(textJsonLd)

  return scriptJsonLd
}
