import Axios from "axios"

const backendUrl = "http://localhost:3000/api"
export const axios = Axios.create({
  baseURL: backendUrl,
})
