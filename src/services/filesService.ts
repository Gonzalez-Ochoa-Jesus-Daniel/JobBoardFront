import api from './api'

const MINIO_BASE = 'https://api-minio.ant-code.org/uttecamjb'

export const getImageUrl = (key: string): string =>
  `${MINIO_BASE}/${key.replace(/^\//, '')}`

export const extractKey = (urlOrKey: string): string => {
  const withoutQuery = urlOrKey.split('?')[0]
  const prefix = `${MINIO_BASE}/`
  return withoutQuery.startsWith(prefix)
    ? withoutQuery.slice(prefix.length)
    : withoutQuery
}

export const extractFileName = (urlOrKey: string): string => {
  const key = extractKey(urlOrKey)
  const raw = key.split('/').pop() ?? ''
  return raw ? decodeURIComponent(raw) : 'archivo'
}

export const getPresignedUrl = async (urlOrKey: string): Promise<string> => {
  const key = extractKey(urlOrKey)
  const data = await api.get(
    `/files/presigned-url?key=${encodeURIComponent(key)}`
  ) as { url: string; expiresInSeconds: number }
  return data.url
}
