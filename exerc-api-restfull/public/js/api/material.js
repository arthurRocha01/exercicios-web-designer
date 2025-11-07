const API_URL = 'http://localhost:5001/api/materiais';

export async function getMateriais() {
    const res = await fetch(API_URL);
    return res.json();
}

export async function createMaterial(material) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material),
    });
    return res.json();
}

export async function updateMaterial(id, material) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material),
    });
    return res.json();
}