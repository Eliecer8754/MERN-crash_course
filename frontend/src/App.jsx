import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import Navbar from "./components/Navbar"
import { useState } from 'react';

function App() {
  const [colorMode, setColorMode] = useState(true);
  return (
    <>
      <div className={`h-full flex flex-col items-center text-white ${colorMode ? "bg-gray-800" : "bg-white" }`}>
        <Navbar colorMode={colorMode} setColorMode={setColorMode} />
        <Routes>
          <Route path="/" element={<HomePage colorMode={colorMode}  />} />
          <Route path="/create" element={<CreatePage colorMode={colorMode} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
