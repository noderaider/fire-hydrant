import createFireHydrant from './createFireHydrant'
import createImmutableSerializer from './serializers/createImmutableSerializer'

const { toHydrant, fromHydrant, serialize, deserialize } = createFireHydrant({ serializers: [createImmutableSerializer()] })
export { toHydrant, fromHydrant, serialize, deserialize }
