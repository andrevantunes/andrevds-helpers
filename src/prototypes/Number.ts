import { setProto } from './ProtoSetter'

declare global {
  interface NumberConstructor {
    isNumeric(n : number): boolean;
  }
  interface Number {
    padStart(num: number, pad: number | string )
  }
}

setProto(Number, 'padStart', function() {
  return this.toString().padStart(arguments[0], arguments[1] || '0')
})

Number.isNumeric = function isNumeric(n) {
  if (n === null) return false
  return !Number.isNaN(Number(n)) || Number.isFinite(n)
}
