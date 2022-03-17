import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL as string;

/**
 * Creating an axios instance for future usage.
 */
const api = axios.create({
  baseURL
})

export default api;