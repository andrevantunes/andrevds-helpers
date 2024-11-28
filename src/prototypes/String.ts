import { setProto } from './ProtoSetter'

declare global {
  interface String {
    pluralize(counter?: number): string
    crop(size: number, end?: string): string
    slugify(): string
    ensureSlashStart(): string
    toCamelCase(): string
    toPascalCase(): string
    toJSONObject(): object
  }
}

setProto(String, 'pluralize', function() {
  if (this.length === 0 || arguments[0] === 1 || this.substr(-1) === 's') return this
  const variants = [
    { sufixMatch: 'm', numReplace: 1, sufixReplace: 'ns' },
    { sufixMatch: 'l', numReplace: 1, sufixReplace: 'is' },
    { sufixMatch: 'r', numReplace: 0, sufixReplace: 'res' },
    { sufixMatch: 'ão', numReplace: 2, sufixReplace: 'ões' },
  ]
  const match = variants.find(({ sufixMatch }) => this.match(new RegExp(`${sufixMatch}$`)))
  if (!match) return this + 's'
  return this.substr(0, this.length - match.sufixMatch.length) + match.sufixReplace
})

setProto(String, 'crop', function() {
  if (!arguments[0]) return this
  const length = arguments[0]
  const extension = arguments[1] === undefined ? '...' : arguments[1]
  if (this.length > length) return this.substr(0, length) + extension
  return this
})

setProto(String, 'slugify', function() {
  const strSChar = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ'
  const strNoSChars = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC'
  const str = this.toLowerCase()
    .replace(/\n/g, ' ')
    .replace(/ +/g, ' ')
    .trim()
  let newStr = ''
  for (let i = 0; i < str.length; i++) {
    if (strSChar.indexOf(str.charAt(i)) !== -1) {
      newStr += strNoSChars.substr(strSChar.search(str.substr(i, 1)), 1)
    } else {
      newStr += str.substr(i, 1)
    }
  }
  return newStr.replace(/[^a-zA-Z 0-9]/g, '').replace(/[ ]/g, '-')
})

setProto(String, 'ensureSlashStart', function() {
  if (this.match(/^\//)) return this.toString()
  return `/${this}`
})

setProto(String, 'toCamelCase', function() {
  const upperFirstLetter = arguments[0] === true
  return this.replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index, xxx) {
      if (index > 0 && xxx.substr(index - 1, 1) === '$') return match
      return +match === 0 ? '' : match[index === 0 && !upperFirstLetter ? 'toLowerCase' : 'toUpperCase']()
    })
})

setProto(String, 'toPascalCase', function() {
  return this.toCamelCase(true)
})

setProto(String, 'toJSONObject', function() {
  try {
    return JSON.parse(this)
  } catch (e) {
    return null
  }
})
