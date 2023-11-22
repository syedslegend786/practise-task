import Axios from "axios"

const backendUrl = process.env.BACKEND_URL as string
export const axios = Axios.create({
  baseURL: "https://salleh-assessment.vercel.app/api",
})
