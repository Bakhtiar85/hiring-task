import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../src/components/Register";  // Assuming the Register component is in this path
import { registerUser } from "../src/services/authService";  // Mocking the authService

// Mock the registerUser service
jest.mock("../src/services/authService", () => ({
    registerUser: jest.fn(),
}));

describe("Register Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();  // Clear mock history between tests
    });

    it("renders the registration form", () => {
        render(<Register />);

        // Check if input fields are present
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
    });

    it("displays success message on successful registration", async () => {
        // Mock the service call to resolve successfully
        (registerUser as jest.Mock).mockResolvedValueOnce({});

        render(<Register />);

        // Fill out form
        fireEvent.change(screen.getByPlaceholderText("Username"), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "password123" },
        });

        // Submit form
        fireEvent.click(screen.getByRole("button", { name: "Register" }));

        // Wait for the success message to appear
        await waitFor(() =>
            expect(screen.getByText("Registration successful!")).toBeInTheDocument()
        );

        // Ensure that registerUser was called with the correct data
        expect(registerUser).toHaveBeenCalledWith({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        });
    });

    it("displays error message on failed registration", async () => {
        // Mock the service call to reject with an error
        (registerUser as jest.Mock).mockRejectedValueOnce(new Error("Registration failed"));

        render(<Register />);

        // Fill out form
        fireEvent.change(screen.getByPlaceholderText("Username"), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "password123" },
        });

        // Submit form
        fireEvent.click(screen.getByRole("button", { name: "Register" }));

        // Wait for the error message to appear
        await waitFor(() => expect(screen.getByText("Registration failed")).toBeInTheDocument());

        // Ensure that registerUser was called with the correct data
        expect(registerUser).toHaveBeenCalledWith({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        });
    });

    it("displays validation errors if fields are left empty", async () => {
        render(<Register />);

        // Submit the form without filling it out
        fireEvent.click(screen.getByRole("button", { name: "Register" }));

        // Since the fields are required, the browser's built-in validation should prevent submission
        await waitFor(() => {
            expect(screen.getByPlaceholderText("Username")).toBeInvalid();
            expect(screen.getByPlaceholderText("Email")).toBeInvalid();
            expect(screen.getByPlaceholderText("Password")).toBeInvalid();
        });

        expect(registerUser).not.toHaveBeenCalled();
    });
});
