const API_URL = "http://localhost:8080/api/properties";

const api = {
    async getAll() {
        const response = await fetch(API_URL);
        return response.json();
    },

    async getById(id) {
        const response = await fetch(`${API_URL}/${id}`);
        return response.json();
    },

    async create(property) {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(property),
        });
        return response.json();
    },

    async update(id, property) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(property),
        });
        return response.json();
    },

    async delete(id) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    }
};
