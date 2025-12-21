export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Login failed");
    }

    return data;
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Registration failed");
    }

    return data;
};
