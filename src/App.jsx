import React, { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./UserContext"; 
import ProtectedRoute from "./ProtectedRoutes"; 
import Header from "./components/Header";
import Footer from "./components/Footer";

// Lazy-loaded components
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const EventsPage = lazy(() => import("./pages/Customer/Events"));
const HomePage = lazy(() => import("./pages/Home"));
const OAuthCallback = lazy(() => import("./components/oAuth"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const UnauthorizedPage = lazy(() => import("./pages/Unauthorized"));

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/oauth2/callback" element={<OAuthCallback />} />
            <Route path="/home" element={<HomePage />} />

            {/* Protected Routes */}
            <Route
              path="/events"
              element={
                <ProtectedRoute
                  element={<EventsPage />}
                  roles={["CUSTOMER", "EVENT_MANAGER", "VENDOR"]} // Accessible by all roles
                />
              }
            />

            {/* Unauthorized Route */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* 404 Fallback Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;