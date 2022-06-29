import React ,{useContext} from 'react'
import {  Box,Button,AppBar,Typography, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logo from '../res/logo-icon.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import DataContext from '../context/DataContext';



const Header = () => {
    let navigate = useNavigate()
    const {user,logoutUser}= useContext(DataContext)
    
    const size_theme = useTheme()
    const md_up = useMediaQuery(size_theme.breakpoints.up('md'));
    // const xs_only = useMediaQuery(size_theme.breakpoints.only('xs'));

    

      const buttonStyle = {
        backgroundColor:'primary.main',
        // width:{xs:64,lg:88},
        // height:{xs:32,lg:40}

      }

  return (
    
   <AppBar position="static" sx={{backgroundColor:'primary.dark',padding:0}}>
       <Toolbar sx={{display:'flex', justifyContent: 'space-between'}}>
        <Box  display='flex' alignItems="center">
            <img src={logo} width={md_up?52:40} height={md_up?52:40}/>
            <Typography onClick={() => navigate('/')}variant="h5" fontSize={{xs:24,sm:32,md:48,lg:56,xl:60}} sx={{pl:1}}>Pomonoto</Typography>
        </Box>
            
        
        
       <Box sx={{display: 'flex', gap:1}}>
       
           {/* <Button variant="contained" disabled={true}>Notes</Button> */}
           {!user?
           <Button variant="contained" onClick={() =>{navigate('/login')}}  sx={buttonStyle}>Login</Button>
           :<Button variant="contained"  onClick={() =>{logoutUser()}} sx={buttonStyle}>Logout</Button>
           }
           
       </Box>
       </Toolbar>
       
   </AppBar>
  )
}

export default Header