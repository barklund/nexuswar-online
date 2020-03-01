import Provider from './provider'
import Map from './map'

function App({config, onConfig}) {
  return (
    <Provider config={config} onConfig={onConfig}>
      <Map />
    </Provider>
  )
}

export default App;
