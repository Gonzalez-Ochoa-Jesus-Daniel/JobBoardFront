export const normalizeAdminText = (value: unknown): string =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

export const matchesAdminSearch = (query: string, values: unknown[]): boolean => {
  const normalizedQuery = normalizeAdminText(query)

  if (!normalizedQuery) {
    return true
  }

  return values.some((value) => normalizeAdminText(value).includes(normalizedQuery))
}

export const matchesAdminFilterGroup = (filters: string[], prefix: string, value: unknown): boolean => {
  const normalizedPrefix = normalizeAdminText(`${prefix}:`)
  const selectedFilters = filters
    .map(normalizeAdminText)
    .filter((filter) => filter.startsWith(normalizedPrefix))

  return selectedFilters.length === 0 || selectedFilters.includes(normalizeAdminText(`${prefix}: ${value}`))
}
