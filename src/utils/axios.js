import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'


const baseURL = 'https://pomonoto-api.herokuapp.com'


let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${authTokens?.access}`}
});

axiosInstance.interceptors.request.use(async req => {
    if(!authTokens){
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        req.headers.Authorization = `Bearer ${authTokens?.access}`
		return req
    }

    const user = jwt_decode(localStorage.getItem('authTokens'))
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`${baseURL}user/token/refresh/`, {
        refresh: authTokens.refresh
      });

    localStorage.setItem('authTokens', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
})


export default axiosInstance;