// frontend/__tests__/TitleDashboard.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TitleDashboard from "../src/components/TitleDashboard";

// Mocking the service functions
jest.mock("../src/services/titleService", () => ({
    fetchTitles: jest.fn(() => Promise.resolve([])), // Mock an empty initial titles array
    createTitle: jest.fn((title) => Promise.resolve({ ...title, uuid: 'mock-uuid' })), // Mock creating a title
    deleteTitle: jest.fn(() => Promise.resolve()), // Mock deleting a title
}));

// Mocking the react-router-dom module
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("TitleDashboard Component", () => {
    const navigate = require("react-router-dom").useNavigate; // Get the mocked navigate function

    beforeEach(() => {
        navigate.mockClear(); // Clear any previous calls to navigate before each test
        localStorage.clear(); // Clear local storage to prevent side effects
    });

    test("displays 'No titles available' when there are no titles", async () => {
        // Mock token in localStorage to prevent redirection
        localStorage.setItem("token", "mock-token");

        render(<TitleDashboard />);

        const noTitlesMessage = await screen.findByText(/no titles available/i);
        expect(noTitlesMessage).toBeInTheDocument();
    });

    test("can add a new title", async () => {
        // Mock token in localStorage to prevent redirection
        localStorage.setItem("token", "mock-token");

        render(<TitleDashboard />);

        // Simulate user entering a new title and subject
        fireEvent.change(screen.getByPlaceholderText(/new title/i), { target: { value: 'New Title' } });
        fireEvent.change(screen.getByPlaceholderText(/subject/i), { target: { value: 'New Subject' } });

        // Simulate the add title button click
        fireEvent.click(screen.getByText(/add title/i));

        // Check that the new title appears in the document
        const newTitle = await screen.findByText(/new title/i);
        expect(newTitle).toBeInTheDocument();
    });

    // test("can delete a title", async () => {
    //     // Mock token in localStorage to prevent redirection
    //     localStorage.setItem("token", "mock-token");

    //     render(<TitleDashboard />);

    //     // Simulate user entering a new title and subject
    //     fireEvent.change(screen.getByPlaceholderText(/new title/i), { target: { value: 'New Title' } });
    //     fireEvent.change(screen.getByPlaceholderText(/subject/i), { target: { value: 'New Subject' } });

    //     // Simulate the add title button click
    //     fireEvent.click(screen.getByText(/add title/i));

    //     // Check that the new title appears in the document
    //     const newTitle = await screen.findByText(/new title/i);
    //     expect(newTitle).toBeInTheDocument();

    //     // Find the delete button associated with the new title
    //     const deleteButton = screen.getByText(/Delete/i);

    //     // Simulate the Delete title button click
    //     fireEvent.click(deleteButton);

    //     // Check that the title has been removed
    //     expect(newTitle).not.toBeInTheDocument();
    // });

});