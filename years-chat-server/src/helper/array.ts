export function arrayMatch (arr1: any[], arr2: any[]): boolean {
  if (arr1.length === arr2.length) {
    let elementMissing = false
    arr1.forEach(element => {
      if (!arr2.includes(element)) {
        elementMissing = true
        return false
      }
    }
    )
    return !elementMissing
  }
  return false
}
