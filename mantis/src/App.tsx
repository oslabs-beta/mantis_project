import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <iframe 
          src="http://localhost:3000/d-solo/bec6roi4gpzi8c/95th-percentile-request-latency?orgId=1&from=1738792263303&to=1738794063303&timezone=browser&showCategory=Panel%20options&theme=dark&panelId=1&__feature.dashboardSceneSolo" 
          width="450" 
          height="200" 
          frameBorder="0"
        ></iframe>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
