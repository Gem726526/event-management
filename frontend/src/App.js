import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/Auth/SignUp';
import { Login } from './pages/Auth/Login';
import { EventList } from './pages/Events/EventList';
import { Router as AppRouter } from './pages/Router'
import { ManageEvents } from './pages/Events/ManageEvents';
import { CalendarView } from './pages/Events/CalendarView';
import { ProtectedRoute } from './pages/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="/events/:id"
            element={
              <ProtectedRoute
                element={EventDetails}
                allowedRoles={['Admin', 'EventOrganizer', 'Participant']}
              />
            }
          /> */}
          <Route
            path="/events"
            element={
              <ProtectedRoute
                element={EventList}
                allowedRoles={['Admin', 'EventOrganizer', 'Participant']}
              />
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute
                element={CalendarView}
                allowedRoles={['Admin', 'EventOrganizer', 'Participant']}
              />
            }
          />
          <Route
            path="/manage-events"
            element={
              <ProtectedRoute
                element={ManageEvents}
                allowedRoles={['Admin', 'EventOrganizer']}
              />
            }
          />
          <Route path="/" element={<AppRouter />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
