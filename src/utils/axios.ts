import Axios from "axios"

const backendUrl = process.env.BACKEND_URL as string
export const axios = Axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : "https://salleh-assessment.vercel.app/api",
})
