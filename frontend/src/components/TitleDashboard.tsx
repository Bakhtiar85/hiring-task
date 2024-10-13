import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTitles, createTitle, deleteTitle } from "../services/titleService";
import detectEthereumProvider from "@metamask/detect-provider";

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
    const [successMsg, setSuccessMsg] = useState("");
    const [walletAddress, setWalletAddress] = useState<string | null>(null); // Store connected wallet address
    const navigate = useNavigate();

    // Check for token and redirect if not found
    useEffect(() => {
        const token = localStorage.getItem("token");
        const walletAddress = localStorage.getItem("walletAddress");
        if (!token) {
            navigate("/login");
        }
        if (walletAddress) {
            setWalletAddress(walletAddress);
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

    // MetaMask connection logic
    const connectWallet = async () => {
        const provider: any = await detectEthereumProvider();

        if (provider) {
            try {
                // Request wallet connection
                const accounts = await provider.request({ method: "eth_requestAccounts" });
                setWalletAddress(accounts[0]);

                // Save walletAddress to localStorage
                localStorage.setItem("walletAddress", accounts[0]);
            } catch (err) {
                setError("MetaMask connection failed.");
            }
        } else {
            setError("MetaMask not detected. Please install MetaMask.");
        }
    };

    const handleCreateTitle = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!walletAddress) {
            setError("Please connect your MetaMask wallet to add titles.");
            return;
        }

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
        if (!walletAddress) {
            setError("Please connect your MetaMask wallet to delete titles.");
            return;
        }

        try {
            await deleteTitle(titleId);
            setTitles(titles.filter((title) => title.uuid !== titleId));
            setSuccessMsg("Title deleted successfully.");
        } catch (error: any) {
            setError("Failed to delete the title.");
        }
    };

    return (
        <div className="container">
            <h2>Title Dashboard</h2>

            {error && <p className="error">{error}</p>}

            {!walletAddress &&
                <p className="error">Please connect your MetaMask wallet.</p>
            }
            <div className="wallet">
                {(!error && walletAddress) ? (
                    <>
                        <p>Connected Wallet: {walletAddress}</p>
                        <button onClick={() => setWalletAddress(null)}>Disconnect Wallet</button>
                    </>
                ) : (
                    <button onClick={connectWallet}>Connect MetaMask</button>
                )}
            </div>


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
                    placeholder="Subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    required
                />
                <button type="submit" disabled={!walletAddress}>
                    Add Title
                </button>
            </form>

            <h3>Your Titles</h3>
            {titles.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>UUID</th>
                            <th>Title</th>
                            <th>Subject</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {titles.map((title, index) => (
                            <tr key={title.uuid}>
                                <td>{index + 1}</td>
                                <td>{title.uuid.slice(0, 4)}...</td>
                                <td>{title.title || "N/A"}</td>
                                <td>{title.subject || "N/A"}</td>
                                <td>
                                    <button disabled={!walletAddress} onClick={() => handleDeleteTitle(title.uuid)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No titles available. Add a new title above.</p>
            )}
            {successMsg && <p className="success">{successMsg}</p>}
        </div>
    );
};

export default TitleDashboard;
