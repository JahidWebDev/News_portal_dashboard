import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import MainLayout from './components/layout/MainLayout'
import AdminIndex from './components/layout/pages/AdminIndex' 

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard Layout */}
        <Route path='/dashboard' element={<MainLayout />}>
          <Route path='admin' element={<AdminIndex />} />
        </Route>

        {/* Redirect */}
        <Route path='/' element={<Navigate to="/dashboard/admin" />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App