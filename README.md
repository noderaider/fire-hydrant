# fire-hydrant

**hydration and serialization of state, targeted at Redux Server Side Rendering and ImmutableJS**

[![NPM](https://nodei.co/npm/fire-hydrant.png?stars=true&downloads=true)](https://nodei.co/npm/fire-hydrant/)


## Install

`npm i -S fire-hydrant`


## Documentation

Functions used to store state objects, partial immutables, and full immutables to strings and restore them back to their original state.


## Usage


```
import { fromHydrant, toHydrant, serialize, deserialize } from 'fire-hydrant'


const regularObj =  { a: 'something'
                    , b: [1, 2, 3]
                    , c: { foo: { bar: true }}
                    }
const partialImmutable =  { ...regularObj
                          , d: Immutable.Map({ a: 'foo', b: 'bar' })
                          }
const topLevelImmutableObj = Immutable.fromJS(regularObj)


it('should toHydrant to an object', () => expect(toHydrant({ foo: 'bar' })).toEqual(jasmine.any(Object)))
it('should fromHydrant to an object', () => expect(fromHydrant({ foo: 'bar' })).toEqual(jasmine.any(Object)))
it('should serialize to a string', () => expect(serialize({ foo: 'bar' })).toEqual(jasmine.any(String)))
it('should deserialize to an object', () => expect(deserialize(`{"foo": "bar"}`)).toEqual(jasmine.any(Object)))

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
  let hydrant = toHydrant(topLevelImmutableObj)
  let result = fromHydrant(hydrant)
  expect(result).toEqual(topLevelImmutableObj)
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
  let serialized = serialize(topLevelImmutableObj)
  let result = deserialize(serialized)
  expect(result).toEqual(topLevelImmutableObj)
})

```
