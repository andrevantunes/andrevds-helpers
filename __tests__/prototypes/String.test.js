import 'src/prototypes/String'
import { storyCreator } from 'jest-story'

const describe = storyCreator('String Prototype')

describe(
  'String.prototype.pluralize(quantidade)',
  `Coloca no plural qualquer palavra em pt-BR com possibilidade de receber um parâmetro de quantidade,
onde se este parâmetro for igual a 1 a palavra não será escrita no plural`,
  test => {
    test('Quando variação de finais nas palavras se adapta ás normas do português', expect => {
      expect(`'pão'.pluralize() = 'pões'`)
      expect(`'casa'.pluralize() = 'casas'`)
      expect(`'bolo'.pluralize() = 'bolos'`)
      expect(`'homem'.pluralize() = 'homens'`)
      expect(`'papel'.pluralize() = 'papeis'`)
      expect(`'pilar'.pluralize() = 'pilares'`)
    })

    test('Quando varia quantidade apenas com o valor 1 não coloca no plural', expect => {
      expect(`'casa'.pluralize() = 'casas'`)
      expect(`'casa'.pluralize(0) = 'casas'`)
      expect(`'casa'.pluralize(1) = 'casa'`)
      expect(`'casa'.pluralize(1000) = 'casas'`)
    })
  }
)

describe(
  'String.prototype.crop(posição, extensão)',
  'Corta strings em uma posição adicionando "..." ou qualquer outra extensão no final',
  test => {
    test('Quando varia a posição de corte deve se adaptar ao tamanho da string', expect => {
      expect(`'uma bela casa na colina'.crop() = 'uma bela casa na colina'`)
      expect(`'uma bela casa na colina'.crop(15) = 'uma bela casa n...'`)
      expect(`'uma bela casa na colina'.crop(1000) = 'uma bela casa na colina'`)
      expect('uma bela casa na colina'.crop(22)).toBe('uma bela casa na colin...')
      expect('uma bela casa na colina'.crop(23)).toBe('uma bela casa na colina')
    })
    test('Quando varia a extensão, deve alterar o resultado final do crop', expect => {
      expect(`'uma bela casa na colina'.crop(15, '') = 'uma bela casa n'`)
      expect(`'uma bela casa na colina'.crop(15, '.') = 'uma bela casa n.'`)
    })
  }
)

describe(
  'String.prototype.slugify()',
  'Transforma uma string com caracteres especiais e espaços em uma string amigável para url',
  test => {
    test('Tendo caracteres especiais, variando espaços em brando e quebras de linha no meio da string', expect => {
      expect(`'João é um menino educado'.slugify() = 'joao-e-um-menino-educado'`)
      expect('João é um    menino educado'.slugify()).toBe('joao-e-um-menino-educado')
      expect(' João é um menino educado '.slugify()).toBe('joao-e-um-menino-educado')
      expect('João é um \n menino educado'.slugify()).toBe('joao-e-um-menino-educado')
    })
  }
)

describe(
  'String.prototype.ensureSlashStart',
  'Garante que a string começe com "/", não faz nada caso isso já ocorra',
  test => {
    test('', expect => {
      expect(`'joao-e-um-menino-educado'.ensureSlashStart() = '/joao-e-um-menino-educado'`)
      expect(`'/joao-e-um-menino-educado'.ensureSlashStart() = '/joao-e-um-menino-educado'`)
      expect('joao-e-um-/menino-educado'.ensureSlashStart()).toBe('/joao-e-um-/menino-educado')
      expect('joao-e-um-menino-educado/'.ensureSlashStart()).toBe('/joao-e-um-menino-educado/')
    })
  }
)

describe('String.prototype.toCamelCase()', test => {
  test('Transforma qualquer string em camelcase', expect => {
    expect(`'Minha Variavel'.toCamelCase() = 'minhaVariavel'`)
    expect(`'minha-variavel'.toCamelCase() = 'minhaVariavel'`)
    expect(`'minha_variavel'.toCamelCase() = 'minhaVariavel'`)
    expect('minha$variavel'.toCamelCase()).toBe('minha$variavel')
    expect('minha_variavel'.toCamelCase(true)).toBe('MinhaVariavel')
  })
})

describe('String.prototype.toPascalCase()', test => {
  test('Transforma qualquer string em camelcase', expect => {
    expect(`'Minha Variavel'.toPascalCase() = 'MinhaVariavel'`)
    expect(`'minha-variavel'.toPascalCase() = 'MinhaVariavel'`)
    expect(`'minha_variavel'.toPascalCase() = 'MinhaVariavel'`)
  })
})

describe('String.prototype.toJSONObject()', test => {
  test('Transforma qualquer string em camelcase', expect => {
    expect(`'string invalida'.toJSONObject() = null`)
    expect(`'{}'.toJSONObject() = {}`)
    expect(`'{"name": "André"}'.toJSONObject() = {"name": "André"}`)
  })
})
