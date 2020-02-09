import axios from "axios";

const PORT = process.env.PORT || 3000;

function createService() {
    return axios.create({
        baseURL: `http://localhost:${PORT}`
    });
}

export default createService();
