import React ,{useContext} from 'react'
import {  Box,Button,AppBar,Typography, Toolbar,Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logo from '../res/logo-icon.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import DataContext from '../context/DataContext';



const Footer = () => {
    let navigate = useNavigate()
    const {user,logoutUser}= useContext(DataContext)
    
    const size_theme = useTheme()
    const md_up = useMediaQuery(size_theme.breakpoints.up('md'));

    

      const buttonStyle = {
        backgroundColor:'primary.main',
        width:{xs:64,lg:88},
        height:{xs:32,lg:40}

      }

  return (
    
   <AppBar position="static" sx={{backgroundColor:'primary.dark',padding:2}}>
       <Toolbar sx={{display:'flex', justifyContent: {xs:'center',md:'space-between'}, flexDirection:{xs:'column',md:'row'}}}>
        <Box  display='flex' alignItems="center">
            <img src={logo} width={md_up?40:32} height={md_up?40:32}/>
            <Typography onClick={() => navigate('/')}variant="h5" fontSize={{xs:32,md:40}} sx={{pl:1}}>Pomonoto</Typography>
        </Box>
            
        
        
       <Box sx={{display: 'flex', gap:1,flexDirection:{xs:'column',sm:'row'}}} >
       
          <Typography variant="h6" fontFamily="Mali" align='center'>{"© "} Pomonoto  </Typography>
          <Typography variant="h6" fontFamily="Mali"><Link href='https://www.shanka.tech' variant='inherit' sx={{color:'white',textDecoration: 'underline'}}>
            Created by Shanka</Link></Typography>
           
       </Box>
       </Toolbar>
       
   </AppBar>
  )
}

export default Footer