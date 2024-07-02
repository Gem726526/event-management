import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import ManageEvents from './components/ManageEvents';
import CalendarView from './components/CalendarView';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute
                element={EventDetails}
                allowedRoles={['Admin', 'EventOrganizer', 'Participant']}
              />
            }
          />
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
          <Route path="/" element={<EventList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
