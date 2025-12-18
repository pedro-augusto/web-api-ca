export const addInteraction = async(data) => {
    const res = await fetch(
        `http://localhost:8080/api/interactions`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    )
        return res.json();
};

export const deleteInteraction = async (id) => {
    const res =  fetch(
        `http://localhost:8080/api/interactions/${id}`,
        {
            method: 'DELETE'
        }
    )
    return res;
};