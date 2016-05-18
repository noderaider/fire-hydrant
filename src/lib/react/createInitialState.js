export default function createInitialState({ React, ...deps }) {
  const { PropTypes } = React
  const InitialState = ({ serialize, stateKey = '__initialState__', globalKey, state }) => {

    const serialized = serialize(state, deps)
    const baseKey = globalKey ? `window.${globalKey}=window.${globalKey} || {};window.${globalKey}` : 'window'
    const __html = `${baseKey}.${stateKey}=${serialized}`
    return <script dangerouslySetInnerHTML={{ __html }} />
  }
  InitialState.propTypes = { serialize: PropTypes.func.isRequired }
  return InitialState
}

