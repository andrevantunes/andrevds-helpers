import { setProto } from 'src/prototypes/ProtoSetter'

test('setProto', () => {
  function MyObj() {}
  const a = new MyObj()
  a.x = 1
  setProto(MyObj, 'log', function() {
    return this.x
  })
  expect(a).toEqual({ x: 1 })
  expect(a.log()).toEqual(1)

  a.y = 2
  setProto(MyObj, 'log', function() {
    //Should do nothing
    return this.y
  })
  expect(a).toEqual({ x: 1, y: 2 })
  expect(a.log()).toEqual(1)
})
