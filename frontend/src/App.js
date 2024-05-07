import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Exercise from './pages/Exercise'
import Goals from './pages/Goals'
import MotivationWalls from './pages/MotivationWalls'
import MotivationWallMessages from './pages/MotivationWallMessages'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header /> 
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/exercise/:id' element={<Exercise />} />
            <Route path='/goals' element={<Goals />} />
            <Route path='/gyms' element={<h1>Find Gyms</h1>} />
            <Route path='/workouts' element={<h1>Workouts</h1>} />
            <Route path='/motivation' element={<MotivationWalls />} />
            <Route path='/motivation/:id' element={<MotivationWallMessages />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
