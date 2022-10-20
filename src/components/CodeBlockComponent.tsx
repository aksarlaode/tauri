import { Extension, NodeViewContent, NodeViewWrapper } from '@tiptap/react'

interface Props {
  node: any
  updateAttributes: (event: any) => void
  extension: any
}

export default ({
  node: {
    attrs: { language: defaultLanguage }
  },
  updateAttributes,
  extension
}: Props) => (
  <NodeViewWrapper className="code-block">
    <select
      contentEditable={false}
      defaultValue={defaultLanguage}
      onChange={event => updateAttributes({ language: event.target.value })}
    >
      <option value="null">auto</option>
      <option disabled>—</option>
      {extension.options.lowlight
        .listLanguages()
        .map((lang: string, index: any) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
)
