
import {React, useState,useEffect, useContext, useRef } from 'react';

import {  Grid ,Menu,MenuItem,Slider, Box, Typography} from '@mui/material';
import Timer from './Timer'
import Note from './Note';
import SettingsMenu from './SettingsMenu'
import Count from './Count'

import SettingsIcon from '@mui/icons-material/Settings';
import SoundToggle from './SoundToggle'


import { IconButton } from '@material-ui/core';
import useAxios from '../utils/useAxios'
import DataContext from '../context/DataContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

let infoStyle={  
  fontFamily:'Mali',
  fontSize:{xs:'20px',sm:'24px',md:'28px',lg:'32px'},
  color:'white'
}
let headingStyle={
  fontSize:{xs:'34px',sm:'38px',md:'44px',lg:'52px'},
  color:'white',
  pb:1
}

    
  const Home = () => {
    
      let [setting,setSetting]=useState({session_time:"20",sBreak_time:"5",lBreak_time:"10",rounds:"3"})
      let [tempSetting,setTempSetting]=useState({session_time:setting.session_time,  sBreak_time:setting.sBreak_time, lBreak_time:setting.lBreak_time,rounds:setting.rounds})
      let [currentRound, setCurrentRound]=useState(1)
      let [soundOn,setSoundOn]=useState(true)
      const [anchorEl, setAnchorEl] = useState(null);
      let[key , setKey]=useState(0)
      let timerRef=useRef(0)

      let{user} = useContext(DataContext)
      let server = useAxios()
      
      const theme = useTheme()
      const sm_up = useMediaQuery(theme.breakpoints.up('sm'));
      
      const open = Boolean(anchorEl);
    
      useEffect(()=>{
        // getSettings(1)
        // AvoidSoftInput.setAdjustNothing();
        // AvoidSoftInput.setEnabled(true);
        if(user)getSetting()
        if(localStorage.getItem('access_token')!==null){
          console.log('Homee')

          getSetting()
        }
        },[])

       
        useEffect(() => {
          timerRef.current=timerRef.current+1
          // console.log(timerRef.current)
        })
         
        const handleSettingsClick = (event) => {
          setAnchorEl(event.currentTarget);
        }
      
      


      const handleSettingsClose = () => {
        setAnchorEl(null);
        setTempSetting(setting)
      };




      let updateSetting = () => {
        server
			.put(`user/settings/`, {
				email:user.email,
        session_time:tempSetting.session_time,
        sBreak_time:tempSetting.sBreak_time,
        lBreak_time:tempSetting.lBreak_time,
        rounds:tempSetting.rounds

			})
			.then((res) => {
				console.log(res)
			})
      }

      let getSetting = () => {
        server
			.get(`user/settings/`, {
				email:user.email,
			})
			.then((res) => {
				console.log(res.data)
        setSetting(res.data)
        setTempSetting(res.data)
        setKey(key+1)
			})
      }
      const saveSettings=()=>{
        setKey(key+1)
        setSetting(tempSetting)
        setAnchorEl(null);
        updateSetting()
      }
     
      let getRound=(round)=>{
        setCurrentRound(round)
      }
      let getSoundOn=(on)=>{
        setSoundOn(on)
      }
  return (
    <Box>
      <Box>
     <Grid container sx={{bgcolor:'primary.main',
    // ,py:{
    //   xs: 0, // theme.breakpoints.up('xs')
    //   sm: 0, // theme.breakpoints.up('sm')
    //   md: 0, // theme.breakpoints.up('md')
    //   lg: 0, // theme.breakpoints.up('lg')
    //   xl: 0, // theme.breakpoints.up('xl')
    // }
       px:{
      xs: 3, // theme.breakpoints.up('xs')
      sm: 6, // theme.breakpoints.up('sm')
      md: 8, // theme.breakpoints.up('md')
      lg: 16, // theme.breakpoints.up('lg')
      xl: 32, // theme.breakpoints.up('xl')
    },
    }}
     justifyContent='center'>
      {/* <Grid item container xs={12} justifyContent={'center'}>
        <
      </Grid> */}
      
      {/* page */}
      <Box sx={{marginTop:{xs:4,lg:8,xl:12},
    //   mx:{
    //   xs: 40, // theme.breakpoints.up('xs')
    //   sm: 6, // theme.breakpoints.up('sm')
    //   md: 8, // theme.breakpoints.up('md')
    //   lg: 16, // theme.breakpoints.up('lg')
    //   xl: 32, // theme.breakpoints.up('xl')
    // },
    marginBottom:0,mb:8,
        width:1,height:{xs:650,lg:900,xl:1000},boxShadow:3,padding:{xs:2,lg:4},borderRadius:1.5,bgcolor:'primary.light',}}>
        {/* head */}
        <Grid item container alignItems={'top'}>
          {/* left */}
          <Grid item  xs={2} justifyContent={'flex-start'}>
            <IconButton 
              id="demo-positioned-button"
              
              // <SettingsMenu menuClose={handleSettingsClose} anchor={anchorEl} open={open}/>
              aria-controls={open ?  SettingsMenu: undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleSettingsClick}
              // size='small'
            >
              
              <SettingsIcon  fontSize={sm_up?'large':'medium'}/>
            </IconButton>
          </Grid>
         
          <Menu
                      
                      id="settings-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleSettingsClose}
                      MenuListProps={{
                      'aria-labelledby': 'basic-button',
                      }}
                      sx={{"& .MuiPaper-root": {
                        backgroundColor: "primary.light"
                      }}}
                      
                      
                  >
                      <Box py={4} m={0} px={2} display='flex' flexDirection='column' justifyContent='center'>

                      <Grid container alignItems={"center"} >
                          <Grid item  sx={{px:2}}>
                              <Typography fontSize='1.4rem'>Session Length: </Typography> 
                          </Grid>
                        
                          <Grid item xs={9} justifyContent={"center"} >
                              <Slider size="medium" sx={{mx:4}} min={1} max={60} step={1} valueLabelDisplay="auto" value={tempSetting.session_time}
                              onChange={(event,newValue)=>{setTempSetting({...tempSetting,'session_time':newValue})}}/>
                          </Grid>
                      </Grid>
  
                      <Grid container alignItems={"center"}>
                          <Grid item  sx={{px:2}}>
                            <Typography fontSize='1.4rem'>Short Break:</Typography>
                               
                          </Grid>
                          <Grid item xs={9}>
                              <Slider size="medium" sx={{mx:4}} min={1} max={60} step={1}  valueLabelDisplay="auto"value={tempSetting.sBreak_time} 
                              onChange={(event,newValue)=>{setTempSetting({...tempSetting,'sBreak_time':newValue})}}/>
                          </Grid>
                      </Grid>
  
                      <Grid container alignItems={"center"}>
                          <Grid item  sx={{px:2}}>
                            <Typography fontSize='1.4rem'>Long Break:</Typography>
                               
                          </Grid>
                          <Grid item xs={9} >
                              <Slider size="medium" sx={{mx:4}} min={1} max={60} step={1}  valueLabelDisplay="auto"value={tempSetting.lBreak_time}
                               onChange={(event,newValue)=>{setTempSetting({...tempSetting,'lBreak_time':newValue})}}/>
                          </Grid>
                      </Grid>
  
                      <Grid container alignItems={"center"}>
                          <Grid item  sx={{px:2}}>
                            <Typography fontSize='1.4rem'>Rounds Before Long Break:</Typography>
                               
                          </Grid>
                          <Grid item xs={9} >
                              <Slider size="medium" sx={{mx:4}} min={1} max={10} step={1}  valueLabelDisplay="auto" value={tempSetting.rounds}
                               onChange={(event,newValue)=>{setTempSetting({...tempSetting,'rounds':newValue})}}/>
                          </Grid>
                      </Grid>
                     </Box>
                      {/* <MenuItem onClick={cancelSettings} sx={{...settingsButtonStyle}}>Cancel</MenuItem> */}
                      <Grid container xs ={12} justifyContent="center">
                        <MenuItem sx={{width:'100%',borderRadius:0.5, justifyContent: 'center',display: 'flex',"&:hover":{backgroundColor:'primary.light', contrastText:'primary.dark'}}}  onClick={saveSettings}>
                        <Typography fontSize='1.4rem'>Save Settings</Typography>
                        </MenuItem>
                      </Grid>

                      
                      
                      
                  </Menu>
                  

          
          {/* center */}
          <Grid item container xs={8} justifyContent={'center'}>
          
            
            <Timer key={key} sessionTime={setting.session_time} shortBreak={setting.sBreak_time} longBreak={setting.lBreak_time} rounds={setting.rounds}
            roundCallback={getRound} soundOn={soundOn}/>
            
          
          </Grid>
          {/* right */}
          <Grid item container xs={2} justifyContent={'flex-end'}>
            <Grid item >
              <SoundToggle onCallback={getSoundOn} />
            </Grid>
          </Grid>
          
          
          <Grid item sx={{m:1}}>
            <Count round={currentRound}/>
          </Grid>

        </Grid>
         {/* body */}
        <Box sx={{display:'flex', height:'100%'}}>
          <Note round={currentRound}/>
        </Box>

      </Box>
      

      {/* <AppBar position="absolute" color="primary" sx={{ ml:4,top:0, bottom: 'auto',bgcolor:theme.palette.primary.dark}}>
        
          <Grid container alignItems={"center"} >
            <Grid item xs={10}>
            <ThemeProvider theme={fontTheme}>
              <Typography variant="h4" sx={{m:1}}>
                Pomonoto
              </Typography>
            </ThemeProvider>
            </Grid>
            <Grid item container xs={1} justifyContent='flex-end'>
              <Button variant="contained" disabled={true} onClick={()=>{navigate('/notes')}} sx={{mr:2,bgcolor:theme.palette.primary.main}}>Notes</Button>
            </Grid>
            <Grid item container xs={1} justifyContent='flex-end'>
              {logButton()}
            </Grid>
            
          </Grid>
          
        
        </AppBar> */}
        
    </Grid>
    </Box>
    <Box  sx={{
      px:{
      xs: 4, // theme.breakpoints.up('xs')
      sm: 6, // theme.breakpoints.up('sm')
      md: 8, // theme.breakpoints.up('md')
      lg: 16, // theme.breakpoints.up('lg')
      xl: 32, // theme.breakpoints.up('xl')
    },
    pb:8}} justifyContent='center'>
      <Typography variant='h5' sx={headingStyle} pt={6} align='center'>What is the pomodoro technique?</Typography>
      <Typography variant='h6' sx={infoStyle}>The pomodoro technique is a time manage ment system that breaks your work period into chunks 
      of a specific time. These chunks are then seperated by short breaks. After a certain amount of intervals There is a longer break. </Typography>

      <Typography variant='h5' sx={headingStyle} pt={6} align='center'>Why it works?</Typography>
      <Typography variant='h6'sx={infoStyle}>The pomodoro technique makes it much easier to start a big task that may feel overwhelming.
       By breaking a task into managabley timed chunks if is easier to focus on a tst without feeling like your brain is melting. </Typography>

      <Typography variant='h5' sx={headingStyle}  pt={6} align='center'>Whats special about Pomonoto?</Typography>
      <Typography variant='h6'sx={infoStyle}>The dissapearing note feature allows you to write things down without having to worry about interupting your work session, 
      I personally use this to get rid of thoughts that i feel are worth taking note of but not urgent. The flexibility of Pomonoto is in it's simplicity, It can be used in your own way
       to increase productivity, because we all work differently.</Typography>

      
    </Box>
    </Box>
  )
}

export default Home;