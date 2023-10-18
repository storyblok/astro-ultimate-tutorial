export default function isPreview() {
  return import.meta.env.IS_PREVIEW === 'true'
}
