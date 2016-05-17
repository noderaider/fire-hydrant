import Immutable from 'immutable'

describe('fireHydrant', () => {
  const fireHydrant = require('../../lib')
  const toHydrant = fireHydrant.toHydrant
  const fromHydrant = fireHydrant.fromHydrant
  const serialize = fireHydrant.serialize
  const deserialize = fireHydrant.deserialize

  const regularObj =  { a: 'something'
                      , b: [1, 2, 3]
                      , c: { foo: { bar: true }}
                      }
  const partialImmutable =  { ...regularObj
                            , d: Immutable.Map({ a: 'foo', b: 'bar' })
                            }
  const topLevelImmutable = Immutable.fromJS(regularObj)

  it('has toHydrant function', () => expect(toHydrant).toEqual(jasmine.any(Function)))
  it('has fromHydrant function', () => expect(fromHydrant).toEqual(jasmine.any(Function)))
  it('has serialize function', () => expect(serialize).toEqual(jasmine.any(Function)))
  it('has deserialize function', () => expect(deserialize).toEqual(jasmine.any(Function)))

  it('should toHydrant to an object', () => expect(toHydrant({ foo: 'bar' })).toEqual(jasmine.any(Object)))
  it('should fromHydrant to an object', () => expect(fromHydrant({ foo: 'bar' })).toEqual(jasmine.any(Object)))
  it('should serialize to a string', () => expect(serialize({ foo: 'bar' })).toEqual(jasmine.any(String)))
  it('should deserialize to an object', () => expect(deserialize('{"foo": "bar"}')).toEqual(jasmine.any(Object)))

  it('should be able to toHydrant and fromHydrant back for regular object', () => {
    let hydrant = toHydrant(regularObj)
    let result = fromHydrant(hydrant)
    expect(result).toEqual(regularObj)
  })

  it('should be able to toHydrant and fromHydrant back for partial immutable', () => {
    let hydrant = toHydrant(partialImmutable)
    let result = fromHydrant(hydrant)
    expect(result).toEqual(partialImmutable)
  })

  it('should be able to toHydrant and fromHydrant back for top level immutable', () => {
    let hydrant = toHydrant(topLevelImmutable)
    let result = fromHydrant(hydrant)
    expect(result).toEqual(topLevelImmutable)
  })

  it('should be able to serialize and deserialize to same values for regular object', () => {
    let serialized = serialize(regularObj)
    let result = deserialize(serialized)
    expect(result).toEqual(regularObj)
  })

  it('should be able to serialize and deserialize to same values for partial immutable', () => {
    let serialized = serialize(partialImmutable)
    let result = deserialize(serialized)
    expect(result).toEqual(partialImmutable)
  })

  it('should be able to serialize and deserialize to same values for top level immutable', () => {
    let serialized = serialize(topLevelImmutable)
    let result = deserialize(serialized)
    expect(result).toEqual(topLevelImmutable)
  })
})
