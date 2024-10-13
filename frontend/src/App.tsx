// frontend/src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import TitleDashboard from "./components/TitleDashboard";
import './App.css'; // Import your CSS file for styling

const App: React.FC = () => {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<TitleDashboard />} />
          <Route path="/" element={
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Welcome to the App</h1>
              <p className="text-lg mb-2">
                Please{" "}
                <a href="/login" className="text-blue-500 hover:underline">login</a> or{" "}
                <a href="/register" className="text-blue-500 hover:underline">register</a>.
              </p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
