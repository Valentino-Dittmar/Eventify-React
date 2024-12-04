import {Route, Routes , BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header'
// import Footer from './components/footer/Footer'
import LoginPage from './pages/Login'
import OAuthCallback from './components/oAuth'
import RegisterPage from './pages/Register'
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<ManageServices />}/> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/oauth2/callback" element={<OAuthCallback />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  )
}

export default App;