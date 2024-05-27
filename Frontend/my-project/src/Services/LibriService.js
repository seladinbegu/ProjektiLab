// src/Services/LibriService.js
const API_URL = 'http://localhost:5132/api/Libri';

class LibriService {
    async getLibriList() {
        const response = await fetch(API_URL);
        return response.json();
    }

    async getLibri(id) {
        const response = await fetch(`${API_URL}/${id}`);
        return response.json();
    }

    async createLibri(libriData) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libriData)
        });
        return response.json();
    }

    async updateLibri(id, libriData) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libriData)
        });
        return response.json();
    }

    async deleteLibri(id) {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
    }
}

// Exporting the instance as a named export
export const libriServiceInstance = new LibriService();
