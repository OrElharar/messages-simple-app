const DB_URL = process.env.REACT_APP_PORT;

export const getMessagesFromDB = async () => {
    try {
        const res = await fetch(DB_URL + `/messages`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        if (data.status === 500 || data.status === 400 || data.status === 404) {
            throw data
        }
        return data;
    } catch (err) {
        throw (err)
    }
};

export const postMessageOnDB = async (reqBody) => {
    try {
        const url = process.env.REACT_APP_PORT + "/messages"
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ ...reqBody })
        });
        const data = await res.json()
        console.log(data);
        return data

    } catch (err) {
        console.log("caught err", err);
        throw err.message
    }
};