import axios from "axios";

const PORT = process.env.PORT || 3000;

function createService() {
    return axios.create({
        baseURL: process.browser
            ? `${location.origin}`
            : `http://localhost:${PORT}`,
    });
}

export default createService();
