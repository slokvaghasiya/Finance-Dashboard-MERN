
import { Box, CssBaseline } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "@/pages/navbar/Navbar"
import Dashboard from "@/pages/dashboard/Dashboard"
import Predictions from "./pages/predictions/Predictions"

function App() {

  return (
    <div className='app' >
      <BrowserRouter>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem" >
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/predictions" element={<Predictions />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  )
}

export default App
