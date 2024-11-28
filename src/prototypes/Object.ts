import { setProto } from './ProtoSetter'

declare global {
  interface Object {
    objectMap(a: any): any
    objectReduce(a: any): any
    mergeMutable(): any
    objectSize(): number
    toQueryString(): string
    without(any: any): Object
  }
}

const each = (obj, cb) => {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue
    cb(key, obj[key])
  }
}

setProto(Object, 'objectMap', function() {
  const interactor = arguments[0]
  const arr = []
  each(this, (key, obj) => arr.push(interactor(obj, key)))
  return arr
})

setProto(Object, 'objectReduce', function() {
  const interactor = arguments[0]
  let newObj = arguments[1] === undefined ? {} : arguments[1]
  let index = 0
  each(this, (key, obj) => {
    newObj = interactor(newObj, obj, key, index++)
  })
  return newObj
})

setProto(Object, 'mergeMutable', function() {
  each(arguments, (key, obj1) => {
    each(obj1, (name, obj2) => (this[name] = obj2))
  })
  return this
})

setProto(Object, 'objectSize', function() {
  let size = 0
  each(this, () => size++)
  return size
})

setProto(Object, 'toQueryString', function() {
  const queryString = []
  each(this, (name, obj) => {
    queryString.push(name + '=' + encodeURIComponent(obj))
  })
  if (queryString.length === 0) return ''
  return '?' + queryString.join('&')
})

setProto(Object, 'without', function() {
  if (arguments.length === 0) return this
  const args = [...arguments]
  const newObj = {}
  each(this, (name, obj) => {
    if (!args.includes(name)) newObj[name] = obj
  })
  return newObj
})
