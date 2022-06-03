import {createContext, useState, useEffect} from 'react'
import axiosInstance from '../utils/axios';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import useAxios from '../utils/useAxios'


const DataContext = createContext();
export default DataContext


export const DataProvider= ({children})=> {
    let [authTokens,setAuthTokens] = useState(()=> localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null)
    let [user,setUser]=useState(()=>localStorage.getItem('authTokens')?jwt_decode(localStorage.getItem('authTokens')):null)
    let [userNote,setUserNote]= useState(()=>localStorage.getItem('userNote')?localStorage.getItem('userNote'):null)
    const navigate = useNavigate()
    // const server = useAxios()

    const loginUser = (e,email,password) => {
        e.preventDefault();
        console.log('form submitted')

        axiosInstance
            .post(`user/token/`, {
                email: email,
                password: password,
            })
            .then((res) => {
                setAuthTokens(res.data)
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens', JSON.stringify(res.data));
                localStorage.setItem('user',JSON.stringify(jwt_decode(res.data.access)));
                // // console.table(jwt_decode(res.data.access))
                // localStorage.setItem('refresh_token', res.data.refresh);
                // axiosInstance.defaults.headers['Authorization'] =
                //     'JWT ' + localStorage.getItem('access_token');
                navigate('/');
                //console.log(res);
                //console.log(res.data);
            });
    };




    const registerUser = (e,email,password,password2) => {
        e.preventDefault();
        console.log('form submitted')

        axiosInstance
            .post(`user/register/`, {
                email: email,
                password: password,
                password2: password2,
            })
            .then((res) => {
                setAuthTokens(res.data)
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens', JSON.stringify(res.data));
                localStorage.setItem('user',JSON.stringify(jwt_decode(res.data.access)));
                // // console.table(jwt_decode(res.data.access))
                // localStorage.setItem('refresh_token', res.data.refresh);
                // axiosInstance.defaults.headers['Authorization'] =
                //     'JWT ' + localStorage.getItem('access_token');
                navigate('/');
                //console.log(res);
                //console.log(res.data);
            });
    };



    // let noteGet=()=>{
        
    //     axiosInstance.get(`user/notes/`, {
           
            
    //     }).then((response)=>{
    //         console.log(response.data[0].body)
    //         setUserNote(response.data[0].body)
    //         localStorage.setItem('userNote', response.data[0].body)
    //     })
            
    // }

    const refreshToken = () => {
    
        axiosInstance
            .post(`token/refresh`, {
                refresh: authTokens.refresh,
               
            })
            .then((res) => {
                setAuthTokens(res.data)
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens', JSON.stringify(res.data));
                // localStorage.setItem('user',JSON.stringify(jwt_decode(res.data.access)));
                // // console.table(jwt_decode(res.data.access))
                // localStorage.setItem('refresh_token', res.data.refresh);
                // axiosInstance.defaults.headers['Authorization'] =
                //     'JWT ' + localStorage.getItem('access_token');
                // noteGet()
                navigate('/');
                //console.log(res);
                //console.log(res.data);
            });
    };

    let logoutUser=()=>{
        setAuthTokens(null)
        setUser(null)
        setUserNote(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('userNote')
        localStorage.removeItem('user')

        navigate('/login')
    }

    let contextData={
        
        user:user,
        authTokens: authTokens,
        userNote: userNote,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser
        // noteGet:noteGet,

    };



    return(
    <DataContext.Provider value={contextData}>
        {children}
    </DataContext.Provider>
    )

}