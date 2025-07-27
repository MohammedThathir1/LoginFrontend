import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PrivateRoute from "./utils/PrivateRoute"
import Welcome from "./pages/Welcome"
import { Toaster } from "react-hot-toast"

function App() {
 

  return (
    <Router>
      <Toaster position="top-center" toastOptions={{duration:3000}}/>    
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/welcome" element={
          <PrivateRoute>
            <Welcome/>
          </PrivateRoute>
        }/>
      </Routes>
    </Router>
  )
}

export default App
