const API_URL = "http://localhost:8000/api/v1/auth/";

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export const registerUser = async (data: RegisterData) => {
    const response = await fetch(`${API_URL}register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
    }

    return await response.json();
};

export const loginUser = async (data: LoginData) => {
    const response = await fetch(`${API_URL}login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    const { token } = await response.json();
    localStorage.setItem("token", token); // Store JWT in local storage
    return token;
};
