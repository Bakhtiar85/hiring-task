// frontend/src/components/Register.tsx
import React, { useState } from "react";
import { registerUser } from "../services/authService";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await registerUser({ username, email, password });
            setSuccessMsg("Registration successful!");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
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
                        Register
                    </button>
                </form>
                {successMsg && <p className="text-green-500">{successMsg}</p>}
            </div>
        </div>
    );
};

export default Register;
