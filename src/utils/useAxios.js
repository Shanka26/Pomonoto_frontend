import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import DataContext from '../context/DataContext'


const baseURL = 'https://pomonoto-api.herokuapp.com/';


const useAxios = () => {
    let { setUser,user,authTokens, setAuthTokens} = useContext(DataContext)

    const axiosInstance = axios.create({
        baseURL,
        headers:{Authorization: `Bearer ${authTokens?.access}`}
    });


    axiosInstance.interceptors.request.use(async req => {
        if(!user)return req
        
        if (!authTokens){
            authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        }

        if(authTokens){
            let user = jwt_decode(authTokens.access)
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            if(!isExpired) return req
            
            const response = await axios.post(`${baseURL}user/token/refresh/`, {
                refresh: authTokens.refresh
            });
    
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            setAuthTokens(response.data)
            setUser(jwt_decode(response.data.access))
            req.headers.Authorization = `Bearer ${response.data.access}`
        }
        return req
    })
    
    return axiosInstance
}

export default useAxios;