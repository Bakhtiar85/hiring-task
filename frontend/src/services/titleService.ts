const API_URL = "http://localhost:8000/api/v1/title/";

interface TitleData {
    title: string;
    subject: string;
}

export const fetchTitles = async () => {
    const token = localStorage.getItem("token"); // Retrieve JWT from localStorage
    const response = await fetch(API_URL, {
        headers: {
            Authorization: `${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch titles.");
    }

    return await response.json();
};

export const createTitle = async (data: TitleData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create title.");
    }

    return await response.json();
};

export const deleteTitle = async (titleId: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}${titleId}`, {
        method: "DELETE",
        headers: {
            Authorization: `${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete title.");
    }
};
