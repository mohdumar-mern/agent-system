import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Login from "./features/auth/Login";
import Dashboard from "./features/auth/Dashboard";
import PrivateRoute from "./config/PrivateRoute";
import Agent from "./features/agents/Agent";
import Contact from "./features/contacts/Contact";
import AgentContacts from "./features/contacts/SingleContactByAgents";
import Home from "./components/Home";

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/agents"
            element={
              <PrivateRoute>
                <Agent />
              </PrivateRoute>
            }
          />

          <Route
            path="/contact/upload"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="/agents/:id/contacts" 
            element={
              <PrivateRoute>
                <AgentContacts />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
