import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import Register from "./components/Register";
import Login from "./components/Login";
import './App.css'; // Import your CSS file for styling

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/register" element={<Register />} /> {/* Use element instead of Component */}
          <Route path="/login" element={<Login />} /> {/* Use element instead of Component */}
          <Route path="/" element={
            <>
              <h1>Welcome to the App</h1>
              <p>Please <a href="/login">login</a> or <a href="/register">register</a>.</p>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
