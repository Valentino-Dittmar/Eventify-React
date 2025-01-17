// src/App.js
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import ProtectedRoute from "./ProtectedRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import CreateEventPage from "./pages/Event_Manager/CreateEvent";
import ViewEventPage from "./pages/ViewEventPage";
import AttendingEventsPage from "./pages/Customer/AttendingEvents";

// Lazy-loading with suspence because of Loading...
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const HomePage = lazy(() => import("./pages/Home"));
const EventsPage = lazy(() => import("./pages/Events"));
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
            {/* Public */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/oauth2/callback" element={<OAuthCallback />} />
            <Route path="/home" element={<HomePage />} />

            {/* Protected Events */}
            <Route
              path="/events"
              element={
                <ProtectedRoute
                  element={<EventsPage />}
                  roles={["CUSTOMER", "EVENT_MANAGER", "VENDOR"]}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={<Profile />}
                  roles={["CUSTOMER", "EVENT_MANAGER", "VENDOR"]}
                />
              }
            />
            <Route
              path="/create-event"
              element={
                <ProtectedRoute
                element={<CreateEventPage />}
                roles={["EVENT_MANAGER"]}
                />
              }
            />
            <Route
              path="/events/:id"
              element={
                <ProtectedRoute
                  element={<ViewEventPage />}
                  roles={["CUSTOMER", "EVENT_MANAGER", "VENDOR"]}
                />
              }
            />
             <Route
              path="/attending-events"
              element={
                <ProtectedRoute
                element={<AttendingEventsPage />}
                roles={["CUSTOMER"]}
                />
              }
            />
       
          


            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;