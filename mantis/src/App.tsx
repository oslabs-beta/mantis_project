import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.tsx';
import Dashboard from './components/Dashboard.tsx';
// import Documentation from './components/Documentation.tsx';
import DropdownMenu from './components/DropdownMenu.tsx';

function App() {
  return (
    <div className='App bg-[#193B2D] p-12 h-screen flex items-center justify-center'>
      <DropdownMenu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/*<Route path='/documentation' element={<Documentation />} /> */}
      </Routes>
    </div>
  );
}

// return (
//   <>
//     <div>
//       <a href="https://vite.dev" target="_blank">
//         <img src={viteLogo} className="logo" alt="Vite logo" />
//       </a>
//       <a href="https://react.dev" target="_blank">
//         <img src={reactLogo} className="logo react" alt="React logo" />
//       </a>
//     </div>
//     <h1>Vite + React</h1>
//     <div className="card">
//       <button onClick={() => setCount((count) => count + 1)}>
//         count is {count}
//       </button>
//       <p>
//         Edit <code>src/App.tsx</code> and save to test HMR
//       </p>
//     </div>
//     <p className="read-the-docs">
//       Click on the Vite and React logos to learn more
//     </p>
//   </>
// )
export default App;
