// frontend/__tests__/Login.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../src/components/Login";
import { loginUser } from "../src/services/authService"; // Import the service

// Mock navigate function
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

// Mock the loginUser function
jest.mock("../src/services/authService", () => ({
    loginUser: jest.fn(),
}));

describe("Login Component", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    test("renders login form", () => {
        render(<Login />);

        // Target input fields by placeholder text
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

        // Target the button specifically
        const loginButton = screen.getByRole('button', { name: /Login/i });
        expect(loginButton).toBeInTheDocument();
    });

    test("shows error message on invalid login", async () => {
        // Simulate login failure
        (loginUser as jest.Mock).mockRejectedValueOnce(new Error("login failed"));

        render(<Login />);

        // Fill in the email and password fields
        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: "wrongpassword" },
        });

        // Target the button specifically
        const loginButton = screen.getByRole('button', { name: /Login/i });

        // Simulate form submission
        fireEvent.click(loginButton);

        // Check for the error message
        const errorMessage = await screen.findByText(/login failed/i);
        expect(errorMessage).toBeInTheDocument(); // Verify that the error message is displayed
    });
});
