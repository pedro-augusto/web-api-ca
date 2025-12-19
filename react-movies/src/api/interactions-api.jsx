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

export const removeInteraction = async (data) => {
    const res =  fetch(
        `http://localhost:8080/api/interactions/${data.username}/${data.movieId}/${data.interactionType}`,
        {
            method: 'DELETE'
        }
    )
    return res;
};

export const getUserInteractions = async (username) => {
    const res = await fetch(
        `http://localhost:8080/api/interactions/${username}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return res.json();
};
