import { setProto } from './ProtoSetter'

declare global {
  interface Array<T> {
    last(): any;
    unique(): boolean;
    toObject(field?: string): any
    toObjectGrouped(): any[]
  }
  interface ArrayConstructor {
    create(): any[];
  }
}

setProto(Array, 'last', function() {
  return this.length === 0 ? undefined : this[this.length - 1]
})

setProto(Array, 'unique', function() {
  return this.filter((item, pos) => this.indexOf(item) === pos)
})

setProto(Array, 'toObject', function() {
  const field = arguments[0]
  return this.reduce((result, item, index) => {
    const key = field ? item[field] : index
    result[key] = item
    return result
  }, {})
})

setProto(Array, 'toObjectGrouped', function() {
  return this.reduce((result, item) => {
    const key = item[arguments[0]]
    if (!result[key]) result[key] = []
    result[key].push(item)
    return result
  }, {})
})

Array.create = function() {
  return Array(arguments[0] || 0).fill(arguments[1], arguments[2], arguments[3])
}
