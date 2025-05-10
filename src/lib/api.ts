import config from "@/config"
import axios from "axios"

const api = axios.create({
    baseURL: config.api.baseUrl
})

export default api;