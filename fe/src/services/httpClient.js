const httpClient = {
    get: (url) => {
        return fetch(url).then((res) => res.json());
    },
    post: (url, data) => {
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    },
};

export default httpClient;
