import {Route, Routes , BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/Login'
import OAuthCallback from './components/oAuth'
import RegisterPage from './pages/Register'
import EventsPage from './pages/Customer/Events'
import HomePage from './pages/Home'
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<ManageServices />}/> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/oauth2/callback" element={<OAuthCallback />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;