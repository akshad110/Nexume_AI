import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const STRAPI_BASE =
  import.meta.env.VITE_STRAPI_API_URL ||
  (import.meta.env.DEV ? "http://localhost:1337/api" : "");

if (!STRAPI_BASE && import.meta.env.PROD) {
  console.error(
    "VITE_STRAPI_API_URL is missing. Add it in Render → Environment, then Manual Deploy the static site."
  );
}

const axiosClient = axios.create({
  baseURL: STRAPI_BASE.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});


const CreateNewResume=(data)=>axiosClient.post('/user-resumes',data);
const GetUserResume=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);
const UpdateResumeInfo = (id, data) =>
  axiosClient.put(`/user-resumes/${id}`, data);
const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id+"?populate=*")
const DeleteResumeById=(id)=>axiosClient.delete('/user-resumes/'+id)

export default{
    CreateNewResume,
    GetUserResume,
    UpdateResumeInfo,
    GetResumeById,
    DeleteResumeById
}