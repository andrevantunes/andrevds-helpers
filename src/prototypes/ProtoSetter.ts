export const setProto = (base, name, callback) => {
  if (base.prototype[name] !== undefined) return null
  base.prototype[name] = callback
  Object.defineProperty(base.prototype, name, { enumerable: false })
}
