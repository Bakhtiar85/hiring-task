import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTitles, createTitle, deleteTitle } from "../services/titleService";
import detectEthereumProvider from "@metamask/detect-provider";
import { logOutUser } from "../services/authService";

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

    const handleLogOut = async () => {
        logOutUser();
        navigate("/login");
    }

    return (
        <div className="containermx-auto p-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Title Dashboard</h2>
                <button onClick={handleLogOut} type="button" className="bg-red-500/80 text-white px-2 py-1 rounded hover:bg-red-500/60">
                    Logout
                </button>
            </div>

            {error && <p className="error text-red-500">{error}</p>}

            {!walletAddress && <p className="error text-red-500">Please connect your MetaMask wallet.</p>}
            <div className="wallet mb-4">
                {(!error && walletAddress) ? (
                    <>
                        <p>Connected Wallet: {walletAddress}</p>
                        <button onClick={() => setWalletAddress(null)} className="mt-2 text-blue-500 underline">
                            Disconnect Wallet
                        </button>
                    </>
                ) : (
                    <button onClick={connectWallet} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Connect MetaMask
                    </button>
                )}
            </div>

            <form onSubmit={handleCreateTitle} className="mb-6 space-y-4">
                <input
                    type="text"
                    placeholder="New Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Add Title
                </button>
            </form>

            <h3 className="text-xl font-semibold">Your Titles</h3>
            {titles.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border-b text-left text-gray-600">Sr. No</th>
                            <th className="px-4 py-2 border-b text-left text-gray-600">UUID</th>
                            <th className="px-4 py-2 border-b text-left text-gray-600">Title</th>
                            <th className="px-4 py-2 border-b text-left text-gray-600">Subject</th>
                            <th className="px-4 py-2 border-b text-left text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {titles.map((title, index) => (
                            <tr key={title.uuid} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{title.uuid.slice(0, 4)}...</td>
                                <td className="px-4 py-2 border-b">{title.title || "N/A"}</td>
                                <td className="px-4 py-2 border-b">{title.subject || "N/A"}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        disabled={!walletAddress}
                                        onClick={() => handleDeleteTitle(title.uuid)}
                                        className={`px-2 py-1 text-white ${!walletAddress ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500'} rounded`}
                                    >
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
            {successMsg && <p className="success mt-4 text-green-500">{successMsg}</p>}
        </div>
    );
};

export default TitleDashboard;
