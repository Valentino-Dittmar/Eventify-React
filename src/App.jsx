import { useState } from 'react'
import './App.css'
import {Route, Routes , BrowserRouter as Router} from 'react-router-dom'
import Services from './components/Services'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Services />}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;