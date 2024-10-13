// frontend/src/components/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await loginUser({ email, password });
            navigate("/dashboard");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
