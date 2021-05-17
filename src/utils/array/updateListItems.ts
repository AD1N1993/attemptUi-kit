export default {
  removeItem: <T = unknown>(items: T[], idx: number): T[] => {
    return [...items.slice(0, idx), ...items.slice(idx + 1)]
  },
}
