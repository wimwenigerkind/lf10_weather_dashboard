import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <main className='container'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
