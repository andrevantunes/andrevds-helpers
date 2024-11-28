import { isClient, isServer } from 'src/environment'

test('Environment', () => {
  expect(isClient()).toBe(true)
  expect(isServer()).toBe(false)
})
