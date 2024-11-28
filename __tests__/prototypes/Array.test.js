import 'src/prototypes/Array'
import { storyCreator } from 'jest-story'

const describe = storyCreator('Array Prototype')

describe('Array.prototype.last()', test => {
  test('Pega a última posição de um array', expect => {
    expect(`[1, 2, 43, 2, 1, 5].last() = 5`)
    const a = [1, 2, 43, 2, 1, 5]
    a.push(2)
    expect(a.last()).toBe(2)
    a.unshift(50)
    expect(a.last()).toBe(2)
    expect(a).toEqual([50, 1, 2, 43, 2, 1, 5, 2])

    expect([].last()).toBe(undefined)
  })
})

describe('Array.prototype.unique()', test => {
  test(`Mapeia um novo array apenas com ítens não duplicados`, expect => {
    expect(`[1, 2, 43, 2, 1, 5].unique() = [1, 2, 43, 5]`)
    const a = [1, 2, 43, 2, 1, 5]
    a.push(43)
    a.unshift(50)
    expect(a.unique()).toEqual([50, 1, 2, 43, 5])
    expect(a).toEqual([50, 1, 2, 43, 2, 1, 5, 43])
  })
})

describe('Array.prototype.toObject(campo)', test => {
  test('Quando não é informado um campo, torna o índice do array a chave', expect => {
    expect(`[1, 2, 'x', { x: 1 }].toObject() = { "0": 1, "1": 2, "2": "x", "3": { "x": 1 } }`)
  })
  test('Quando informado o campo, torna o campo de cada objeto interno a chave, substituindo caso haja mais de um', expect => {
    expect(
      `[{ name: 'Andre', slug: 'andre' }, { name: 'Guilherme', slug: 'guilherme' }].toObject('slug') = { "andre": { "name": "Andre", "slug": "andre" }, "guilherme": { "name": "Guilherme", "slug": "guilherme" } }`
    )
  })
})

describe('Array.prototype.toObjectGrouped(campo)', test => {
  test('toObjectGrouped', expect => {
    expect(
      `[
  { name: 'Andre', slug: 'andre', type: 'admin' },
  { name: 'Matheus', slug: 'matheus', type: 'user' },
  { name: 'Guilherme', slug: 'guilherme', type: 'admin' },
].toObjectGrouped('type') = {
  "admin": [{ "name": "Andre", "slug": "andre", "type": "admin" }, { "name": "Guilherme", "slug": "guilherme", "type": "admin" }],
  "user": [{ "name": "Matheus", "slug": "matheus", "type": "user" }]
}`
    )
  })
})

describe('Array.create(numero)', test => {
  test('Cria um array do tamanho desejado', expect => {
    expect('Array.create() = []')
    expect('Array.create(3) = [undefined, undefined, undefined]')
    expect('Array.create(3, 0) = [0, 0, 0]')
    expect(Array.create(2, 'x')).toEqual(['x', 'x'])
    expect(Array.create(0, 'x')).toEqual([])
  })
})
