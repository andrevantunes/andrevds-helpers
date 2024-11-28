import 'src/prototypes/Object'
import { storyCreator } from 'jest-story'

const describe = storyCreator('Object Prototype')

describe('Object.prototype.objectSize()', test => {
  test('Calcula o tamanho do objeto', expect => {
    expect(`({ x: 1, y: 2 }).objectSize() = 2`)
    const a = { x: 1, y: 2 }
    a.z = 3
    expect(a.objectSize()).toBe(3)
    a.w = 0
    Object.defineProperty(a, 'w', { enumerable: false })
    expect(a.objectSize()).toBe(3)
  })
})

describe('Object.prototype.objectMap(interador)', 'Deve rodar um map como se fosse um array', sample => {
  sample(`({ x: 1, y: 2}).objectMap(function(value, key){return key+': '+value}) = ['x: 1', 'y: 2']`)

  test('ignorando objetos não enumeráveis', () => {
    const a = { x: 1, y: 2, w: 0 }
    Object.defineProperty(a, 'w', { enumerable: false })
    expect(a.objectMap((value, key) => `${key}: ${value}`)).toEqual(['x: 1', 'y: 2'])
    expect(a).toEqual({ x: 1, y: 2 })
    expect(a.w).toBe(0)
  })

  test('Deve funcionar para um objeto derivado', () => {
    function SpecificObject() {}
    SpecificObject.prototype.log = function() {
      console.log(this)
    }
    const b = new SpecificObject()
    b.x = 10
    expect(b).toEqual({ x: 10 })
    expect(b.objectMap((value, key) => `${key}: ${value}`)).toEqual(['x: 10'])
  })
})

describe('Object.prototype.objectReduce(interador, valorInicial)', test => {
  test('Deve rodar um reduce como se fosse um array', expect => {
    expect(
      `({ x: 1, y: 2 }).objectReduce(function(obj, value, key){return { ...obj, [value]: key }}) = {"1": "x", "2":"y"}`
    )

    const a = { x: 1, y: 2 }
    expect(a.objectReduce((arr, value, key) => [...arr, `${key}: ${value}`], [])).toEqual(['x: 1', 'y: 2'])
    expect(a.objectReduce((str, value, key) => `${str},${key}: ${value}`, '')).toEqual(',x: 1,y: 2')
    expect(a).toEqual({ x: 1, y: 2 })
  })
})

describe('Object.prototype.mergeMutable(objeto [, objeto2...)', test => {
  test('Mescla vários objetos sem perder a referencia no objeto base', expect => {
    expect(`({ x: 1, y: 2 }).mergeMutable({ z: 3 }) = { "x": 1, "y": 2, "z": 3 }`)

    const a = { x: 1, y: 2 }
    expect(a.mergeMutable()).toEqual({ x: 1, y: 2 })
    expect(a.mergeMutable({ z: 3 })).toEqual({ x: 1, y: 2, z: 3 })
    expect(a).toEqual({ x: 1, y: 2, z: 3 })

    expect(a.mergeMutable({ z: 4 }, { w: 5 })).toEqual({ x: 1, y: 2, z: 4, w: 5 })
    expect(a).toEqual({ x: 1, y: 2, z: 4, w: 5 })
  })
})

describe('Object.prototype.toQueryString()', test => {
  test('Transforma um objeto para queryString', expect => {
    expect(`({}).toQueryString() = ''`)
    expect(`({ x: 1, y: 2 }).toQueryString() = '?x=1&y=2'`)
    expect(`({ x: 'João é um cara bem legal' }).toQueryString() = '?x=Jo%C3%A3o%20%C3%A9%20um%20cara%20bem%20legal'`)
  })
})

describe('Object.prototype.without(campo [, campo2...)', test => {
  test('Remove campos de um objeto', expect => {
    expect(`({ x: 1, y: 2, z: 3 }).without('x') = { "y": 2, "z": 3 }`)

    const a = { x: 1, y: 2, z: 3 }
    expect(a.without()).toEqual({ x: 1, y: 2, z: 3 })
    expect(a.without('x', 'z')).toEqual({ y: 2 })
    expect(a).toEqual({ x: 1, y: 2, z: 3 })
  })
})
