import { Button, Grid, TextField,styled, Typography } from '@material-ui/core'
import { Box } from '@mui/system'
import {React, useEffect, useState, useContext} from 'react'
import { NavLink, useNavigate } from "react-router-dom";

import {Link, Stack } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import jwt_decode from 'jwt-decode';
import DataContext from '../context/DataContext';
// import { useHistory } from 'react-router-dom';
import useAxios from '../utils/useAxios'



const Login = () => {


  let [email,setEmail]= useState("")
  let [password,setPassword]= useState("")
  let{loginUser,setAuthTokens,setUser,authTokens} = useContext(DataContext)
  let backend = useAxios()

  useEffect(() => {
    // getSession();
  },[])


  let navigate = useNavigate(); 


  let handlePasswordChange = (event) => {
    // this.setState({password: event.target.value});
    setPassword(event.target.value);
  }


  let handleUsernameChange = (event) => {
    // this.setState({username: event.target.value});
    setEmail(event.target.value);
  }



  
const login = () => {
  // preventDefault();
  // console.log('form submitted')

  backend
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

// let noteGet=()=>{
  
//     axiosInstance.get(`user/notes/`, {
     
      
//     }).then((response)=>{
//         console.log(response.data[0].body)
//         setUserNote(response.data[0].body)
//         localStorage.setItem('userNote', response.data[0].body)
//     })
      
// }





	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log(formData);

	// 	axiosInstance
	// 		.post(`user/token/`, {
	// 			email: username,
	// 			password: password,
	// 		})
	// 		.then((res) => {
	// 			localStorage.setItem('access_token', res.data.access);
  //       localStorage.setItem('user',JSON.stringify(jwt_decode(res.data.access)));
	// 			// console.table(jwt_decode(res.data.access))
	// 			localStorage.setItem('refresh_token', res.data.refresh);
	// 			axiosInstance.defaults.headers['Authorization'] =
	// 				'JWT ' + localStorage.getItem('access_token');
	// 			navigate('/');
	// 			//console.log(res);
	// 			//console.log(res.data);
	// 		});
	// };


 
  

  return (
    <Box alignItems='center' sx={{display:'flex' ,width:'100%',height:'100%', justifyContent: 'center', alignItems: 'flex_start'}}>
    <Box alignItems='center' sx={{width:600,height:650 ,marginTop:{xs:4,lg:8,xl:12}, marginLeft:{xs:2,sm:8,lg:12},marginRight:{xs:2,sm:8,lg:12}, padding:2, backgroundColor:'#b2dfdb', borderRadius:3,alignItems:'center',justifyContent: 'center'}}>

      <Box mt={8}>
        
      <Box justifyContent='center' alignItems='center' sx={{display: 'flex',marginBottom:4}}>
        <Stack alignItems='center' spacing={1}>
          <LockOutlinedIcon/>
          <Typography variant="h5" >Sign in</Typography>
        </Stack>
        
      </Box>
       
      <Stack spacing={2} justifyContent='center' sx={{ marginLeft:{xs:1,sm:4,lg:8},marginRight:{xs:1,sm:4,lg:8},marginBottom:4 }}>
        
        
        
        <TextField required name="email" label="Email" variant="outlined" placeholder="Email" value={email} onChange={handleUsernameChange}/>
        
        <TextField required variant="outlined" name="password" type='password'  label="Password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
               
        <Button variant="contained" color='primary' onClick={()=>{login()}}>Log in</Button>
       
        
      </Stack>
        
        <Box sx={{marginBottom:8}}>
          <Grid container item xs={12} justifyContent='center'>
            <Typography variant="p">Don't have an account?</Typography>
          </Grid>

          <Grid container justifyContent='center' xs={12}>
            <Link component={NavLink} to="/register" >Create an account</Link>
          </Grid>
        </Box>
    
          
        

      

    
     
        </Box>
    </Box>

    


  </Box>

  )
}

export default Login