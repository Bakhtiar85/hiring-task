import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTitles, createTitle, deleteTitle } from "../services/titleService";

interface Title {
    uuid: string;
    subject: string;
    title: string;
}

const TitleDashboard: React.FC = () => {
    const [titles, setTitles] = useState<Title[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [newSubject, setNewSubject] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Check for token and redirect if not found
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const loadTitles = async () => {
            try {
                const fetchedTitles = await fetchTitles();
                setTitles(fetchedTitles);
            } catch (error: any) {
                setError(error.message);
            }
        };

        loadTitles();
    }, []);

    const handleCreateTitle = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const createdTitle = await createTitle({ title: newTitle, subject: newSubject });
            setTitles([...titles, createdTitle]);
            setNewTitle("");
            setNewSubject("");
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleDeleteTitle = async (titleId: string) => {
        try {
            await deleteTitle(titleId);
            setTitles(titles.filter((title) => title.uuid !== titleId));
        } catch (error: any) {
            setError("Failed to delete the title.");
        }
    };

    return (
        <div className="container">
            <h2>Title Dashboard</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleCreateTitle}>
                <input
                    type="text"
                    placeholder="New Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Title's subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    required
                />
                <button type="submit">Add Title</button>
            </form>

            <h3>Your Titles</h3>
            {titles.length > 0 ? (
                <ul>
                    {titles.map((title) => (
                        <li key={title.uuid}>
                            {
                                title.title &&
                                <div>
                                    <strong>Title: </strong> <span>{title.title}</span>
                                </div>
                            }
                            {
                                title.subject &&
                                <div>
                                    <strong>Subject: </strong><span>{title.subject}</span>
                                </div>
                            }
                            <button onClick={() => handleDeleteTitle(title.uuid)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No titles available. Add a new title above.</p>
            )}
        </div>
    );
};

export default TitleDashboard;
