# Me Salva Javascript Helpers

Projeto destinado a helpers que utilizamos em diversos projetos para diminuir a replicação
, aumentar a cobertura de testes e documentação

## Gerar a build e publicar

Para gerar a build rode o comando:

```bash
yarn build
```

Este comando irá gerar a build na pasta dist.

**Não publique a pasta raiz, publique apenas a pasta `dist`**

### Publicando

Antes de publicar, sempre deve ser gerada uma build e sempre deve-se trocar a versão no `package.json`.
Publique a pasta dist rodando os comandos:

```bash
cd dist
npm publish
```

Caso deseje publicar uma versão de teste utilize tags, por exemplo:
```bash
cd dist
npm publish --tag rc
```


# StoryBook
### String Prototype


#### String.prototype.pluralize(quantidade)

Coloca no plural qualquer palavra em pt-BR com possibilidade de receber um parâmetro de quantidade,
onde se este parâmetro for igual a 1 a palavra não será escrita no plural

**Quando variação de finais nas palavras se adapta ás normas do português**
```js
'pão'.pluralize() = 'pões'
'casa'.pluralize() = 'casas'
'bolo'.pluralize() = 'bolos'
'homem'.pluralize() = 'homens'
'papel'.pluralize() = 'papeis'
'pilar'.pluralize() = 'pilares'
```
**Quando varia quantidade apenas com o valor 1 não coloca no plural**
```js
'casa'.pluralize() = 'casas'
'casa'.pluralize(0) = 'casas'
'casa'.pluralize(1) = 'casa'
'casa'.pluralize(1000) = 'casas'
```
#### String.prototype.crop(posição, extensão)

Corta strings em uma posição adicionando "..." ou qualquer outra extensão no final

**Quando varia a posição de corte deve se adaptar ao tamanho da string**
```js
'uma bela casa na colina'.crop() = 'uma bela casa na colina'
'uma bela casa na colina'.crop(15) = 'uma bela casa n...'
'uma bela casa na colina'.crop(1000) = 'uma bela casa na colina'
```
**Quando varia a extensão, deve alterar o resultado final do crop**
```js
'uma bela casa na colina'.crop(15, '') = 'uma bela casa n'
'uma bela casa na colina'.crop(15, '.') = 'uma bela casa n.'
```
#### String.prototype.slugify()

Transforma uma string com caracteres especiais e espaços em uma string amigável para url

**Tendo caracteres especiais, variando espaços em brando e quebras de linha no meio da string**
```js
'João é um menino educado'.slugify() = 'joao-e-um-menino-educado'
```
#### String.prototype.ensureSlashStart

Garante que a string começe com "/", não faz nada caso isso já ocorra

```js
'joao-e-um-menino-educado'.ensureSlashStart() = '/joao-e-um-menino-educado'
'/joao-e-um-menino-educado'.ensureSlashStart() = '/joao-e-um-menino-educado'
```
#### String.prototype.toCamelCase()



**Transforma qualquer string em camelcase**
```js
'Minha Variavel'.toCamelCase() = 'minhaVariavel'
'minha-variavel'.toCamelCase() = 'minhaVariavel'
'minha_variavel'.toCamelCase() = 'minhaVariavel'
```
#### String.prototype.toPascalCase()



**Transforma qualquer string em camelcase**
```js
'Minha Variavel'.toPascalCase() = 'MinhaVariavel'
'minha-variavel'.toPascalCase() = 'MinhaVariavel'
'minha_variavel'.toPascalCase() = 'MinhaVariavel'
```
#### String.prototype.toJSONObject()



**Transforma qualquer string em camelcase**
```js
'string invalida'.toJSONObject() = null
'{}'.toJSONObject() = {}
'{"name": "André"}'.toJSONObject() = {"name": "André"}
```

### Number Prototype


#### Number.prototype.padStart(casas, prefixo)



**Quando varia número ou casas deve manter a resposta correta**
```js
(5).padStart(2) = '05'
(5).padStart(2, '0') = '05'
(50).padStart(2, '0') = '50'
(500).padStart(2, '0') = '500'
(500).padStart(3, '0') = '500'
(50).padStart(3, '0') = '050'
```
**Quando varia o prefixo ele deve ser usado**
```js
(5).padStart(2, 'xy') = 'x5'
(5).padStart(3, 'xy') = 'xy5'
(5).padStart(4, 'xy') = 'xyx5'
```
#### Number.isNumeric(numero)



```js
Number.isNumeric(2) = true
Number.isNumeric(2.2) = true
Number.isNumeric('2') = true
Number.isNumeric('2.2') = true
Number.isNumeric('2.2.2') = false
Number.isNumeric('a') = false
Number.isNumeric(null) = false
Number.isNumeric(undefined) = false
```

### Array Prototype


#### Array.prototype.last()



**Pega a última posição de um array**
```js
[1, 2, 43, 2, 1, 5].last() = 5
```
#### Array.prototype.unique()



**Mapeia um novo array apenas com ítens não duplicados**
```js
[1, 2, 43, 2, 1, 5].unique() = [1, 2, 43, 5]
```
#### Array.prototype.toObject(campo)



**Quando não é informado um campo, torna o índice do array a chave**
```js
[1, 2, 'x', { x: 1 }].toObject() = { "0": 1, "1": 2, "2": "x", "3": { "x": 1 } }
```
**Quando informado o campo, torna o campo de cada objeto interno a chave, substituindo caso haja mais de um**
```js
[{ name: 'Andre', slug: 'andre' }, { name: 'Guilherme', slug: 'guilherme' }].toObject('slug') = { "andre": { "name": "Andre", "slug": "andre" }, "guilherme": { "name": "Guilherme", "slug": "guilherme" } }
```
#### Array.prototype.toObjectGrouped(campo)



**toObjectGrouped**
```js
[
  { name: 'Andre', slug: 'andre', type: 'admin' },
  { name: 'Matheus', slug: 'matheus', type: 'user' },
  { name: 'Guilherme', slug: 'guilherme', type: 'admin' },
].toObjectGrouped('type') = {
  "admin": [{ "name": "Andre", "slug": "andre", "type": "admin" }, { "name": "Guilherme", "slug": "guilherme", "type": "admin" }],
  "user": [{ "name": "Matheus", "slug": "matheus", "type": "user" }]
}
```
#### Array.create(numero)



**Cria um array do tamanho desejado**
```js
Array.create() = []
Array.create(3) = [undefined, undefined, undefined]
Array.create(3, 0) = [0, 0, 0]
```

### Object Prototype


#### Object.prototype.objectSize()



**Calcula o tamanho do objeto**
```js
({ x: 1, y: 2 }).objectSize() = 2
```
#### Object.prototype.objectMap(interador)

Deve rodar um map como se fosse um array

```js
({ x: 1, y: 2}).objectMap(function(value, key){return key+': '+value}) = ['x: 1', 'y: 2']
```
#### Object.prototype.objectReduce(interador, valorInicial)



**Deve rodar um reduce como se fosse um array**
```js
({ x: 1, y: 2 }).objectReduce(function(obj, value, key){return { ...obj, [value]: key }}) = {"1": "x", "2":"y"}
```
#### Object.prototype.mergeMutable(objeto [, objeto2...)



**Mescla vários objetos sem perder a referencia no objeto base**
```js
({ x: 1, y: 2 }).mergeMutable({ z: 3 }) = { "x": 1, "y": 2, "z": 3 }
```
#### Object.prototype.toQueryString()



**Transforma um objeto para queryString**
```js
({}).toQueryString() = ''
({ x: 1, y: 2 }).toQueryString() = '?x=1&y=2'
({ x: 'João é um cara bem legal' }).toQueryString() = '?x=Jo%C3%A3o%20%C3%A9%20um%20cara%20bem%20legal'
```
#### Object.prototype.without(campo [, campo2...)



**Remove campos de um objeto**
```js
({ x: 1, y: 2, z: 3 }).without('x') = { "y": 2, "z": 3 }
```
