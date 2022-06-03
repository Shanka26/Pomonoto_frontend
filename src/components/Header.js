import React ,{useContext} from 'react'
import {  Box,Button,AppBar,Typography, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import DataContext from '../context/DataContext';



const Header = () => {
    let navigate = useNavigate()
    const {user,logoutUser}= useContext(DataContext)
    

    

      const buttonStyle = {
        backgroundColor:'primary.main',
        width:{xs:64,lg:88},
        height:{xs:32,lg:40}

      }

  return (
    
   <AppBar position="static" sx={{backgroundColor:'primary.dark',padding:0}}>
       <Toolbar sx={{display:'flex', justifyContent: 'space-between'}}>
       
            <Typography onClick={() => navigate('/')}variant="h5" fontSize={{xs:48,md:60}}>Pomonoto</Typography>
        
        
       <Box sx={{display: 'flex', gap:1}}>
       
           {/* <Button variant="contained" disabled={true}>Notes</Button> */}
           {!user?
           <Button variant="contained" onClick={() =>{navigate('/login')}}  sx={buttonStyle}>Login</Button>
           :<Button variant="contained" size='large' onClick={() =>{logoutUser()}} sx={buttonStyle}>Logout</Button>
           }
           
       </Box>
       </Toolbar>
       
   </AppBar>
  )
}

export default Header