export async function fetchParents() {
    const res = await fetch("http://localhost:8080/api/parents");
    if (!res.ok) throw new Error("Fehler beim Laden");
    return res.json(); 
}

export async function addParent(data) {
    const res = await fetch("http://localhost:8080/api/parents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}