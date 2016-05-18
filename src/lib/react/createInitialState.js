import { serializer } from '../'

export default function createInitialState({ React, ...deps }) {
  return ({ serialize = serializer.serialize, stateKey = '__initialState__', globalKey, state }) => {
    const serialized = serialize(state, deps)
    const baseKey = globalKey ? `window.${globalKey}=window.${globalKey} || {};window.${globalKey}` : 'window'
    const __html = `${baseKey}.${stateKey}=${serialized}`
    return <script dangerouslySetInnerHTML={{ __html }} />
  }
}
