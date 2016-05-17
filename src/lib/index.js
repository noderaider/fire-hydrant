import 'babel-polyfill'
import { assert } from 'chai'
import Immutable, { Iterable } from 'immutable'
import serializeJS from 'serialize-javascript'

const NO_RECURSE = ['undefined', 'boolean', 'number', 'string', 'symbol', 'function']
const shouldRecurse = obj => obj !== null && !NO_RECURSE.includes(typeof obj) && !Array.isArray(obj) && typeof obj === 'object'

export const toHydrant = obj => {
  if(Iterable.isIterable(obj)) {
    const __fire = ['(function (o, d) { return d.Immutable.fromJS(o); })', obj.toJS()]
    return { __fire  }
  }
  if(Array.isArray(obj)) {
    return obj.map(x => shouldRecurse(x) ? toHydrant(x) : x)
  }
  const objKeys = Object.keys(obj)
  if(objKeys.length > 0) {
    return objKeys.reduce((newObj, key) => {
      const node = shouldRecurse(obj[key]) ? toHydrant(obj[key]) : obj[key]
      return { ...newObj, [key]: node }
    }, {})
  }
  return obj
}

export const fromHydrant = obj => {
  if(obj.__fire) {
    let fn = eval(obj.__fire[0])
    return fn(obj.__fire[1], { Immutable })
  }
  if(Array.isArray(obj))
    return obj.map(x => shouldRecurse(x) ? fromHydrant(x) : x)
  const objKeys = Object.keys(obj)
  if(objKeys.length > 0) {
    return objKeys.reduce((newObj, key) => {
      const node = shouldRecurse(obj[key]) ? fromHydrant(obj[key]) : obj[key]
      return { ...newObj, ... { [key]: node } }
    }, {})
  }
  return obj
}

export const serialize = obj => {
  return serializeJS(toHydrant(obj))
}

export const deserialize = str => {
  let obj = JSON.parse(str)
  return fromHydrant(obj)
}
