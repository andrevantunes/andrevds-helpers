import * as fs from 'fs'

const transformExpected = expected => {
  if (expected === '') return "''"
  const parse1 = expected.replace(/\/\/.*/, '').trim()
  if (parse1.substr(0, 1) === '{') return JSON.parse(parse1.replace(/\n/g, ''))
  if (parse1.match(/^['"](.*)['"]$/)) return parse1.replace(/'(.*)'/, '$1')
  return eval(parse1)
}

if (typeof global.StoryBookSections === 'undefined') global.StoryBookSections = []
if (typeof global.StoryBookSectionCounter === 'undefined') global.StoryBookSectionCounter = 0

const parseArgs = args => (typeof args[1] !== 'function' ? args : [args[0], '', args[1]])

export const storyCreator = mainTitle => {
  global.StoryBookSections.push(`### ${mainTitle}\n\n\n`)
  return (...args) => {
    const [testTitle, subtitle, callback] = parseArgs(args)
    let allHistory = `#### ${testTitle}\n\n`
    let testCounter = 0
    global.StoryBookSectionCounter++

    const variation = (title, callback) => {
      if (!callback) return variation('', sample => sample(title))
      if (testCounter === 0) allHistory += `${subtitle}\n\n`
      testCounter++

      test(title, () => {
        let testHistory = title ? `**${title}**\n` : ''
        testHistory += '```js\n'
        return new Promise(resolve => {
          let timeout

          const sample = code => {
            if (typeof code !== 'string' || !code.replace(/\n/g, 'å').match(/=/))
              return expect(code)
            let [toExpect, expected] = code
              .replace(/\n/g, 'å')
              .replace(/=/, 'œ')
              .split('œ')
              .map(a => a.trim().replace(/å/g, '\n'))
            if (toExpect.match(/^[{\[]/)) toExpect = toExpect.replace(/\n/g, '')
            clearTimeout(timeout)
            expect(eval(toExpect.replace(/\n/g, '\\n'))).toEqual(transformExpected(expected))
            testHistory += `${code}\n`
            timeout = setTimeout(() => {
              testHistory += '```'
              allHistory += `${testHistory}\n`
              testCounter--
              if (testCounter === 0) {
                global.StoryBookSections.push(allHistory)
                global.StoryBookSectionCounter--
                if (global.StoryBookSectionCounter === 0) {
                  const content = fs.readFileSync('README.md', 'utf8')
                  const content2 = global.StoryBookSections.join('').replace(/\n/g, 'å')
                  let p1 = content.replace(/\n/g, 'å')
                  if (p1.match(new RegExp(`### ${mainTitle}.*å### `)))
                    p1 = p1.replace(new RegExp(`### ${mainTitle}.*å### `), `${content2}å### `)
                  else if (p1.match(new RegExp(`### ${mainTitle}.*`)))
                    p1 = p1.replace(new RegExp(`### ${mainTitle}.*`), `${content2}å`)
                  else p1 += `${content2}å`
                  fs.writeFileSync('README.md', p1.replace(/å/g, '\n'))
                }
              }
              resolve()
            }, 100)
          }
          callback(sample)
        })
      })
    }
    describe(mainTitle, () => callback(variation))
  }
}
