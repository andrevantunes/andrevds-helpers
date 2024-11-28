import 'src/prototypes/Number'
import { storyCreator } from 'jest-story'

const describe = storyCreator('Number Prototype')

describe('Number.prototype.padStart(casas, prefixo)', test => {
  test('Quando varia número ou casas deve manter a resposta correta', expect => {
    expect(`(5).padStart(2) = '05'`)
    expect(`(5).padStart(2, '0') = '05'`)
    expect(`(50).padStart(2, '0') = '50'`)
    expect(`(500).padStart(2, '0') = '500'`)
    expect(`(500).padStart(3, '0') = '500'`)
    expect(`(50).padStart(3, '0') = '050'`)
  })
  test('Quando varia o prefixo ele deve ser usado', expect => {
    expect(`(5).padStart(2, 'xy') = 'x5'`)
    expect(`(5).padStart(3, 'xy') = 'xy5'`)
    expect(`(5).padStart(4, 'xy') = 'xyx5'`)
  })
})

describe('Number.isNumeric(numero)', test => {
  test('', expect => {
    expect(`Number.isNumeric(2) = true`)
    expect(`Number.isNumeric(2.2) = true`)
    expect(`Number.isNumeric('2') = true`)
    expect(`Number.isNumeric('2.2') = true`)
    expect(`Number.isNumeric('2.2.2') = false`)
    expect(`Number.isNumeric('a') = false`)
    expect(`Number.isNumeric(null) = false`)
    expect(`Number.isNumeric(undefined) = false`)
  })
})
