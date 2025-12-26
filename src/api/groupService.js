const API_BASE = "http://localhost:8080/api/groups"

export const fetchGroups = async () => {
    const res = await fetch(API_BASE);
    if(!res.ok) throw new Error("Fehler beim Laden");
    return res.json();
};

export const createGroup = async (newGroup) => {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newGroup),
    });

    if(!res.ok) throw new Error("Fehler beim Erstellen!");
    return res.json();
}