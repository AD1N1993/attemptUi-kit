export default (iri: string): string => {
  const iriSplit = iri.split('/')
  return iriSplit[iriSplit.length - 1]
}
