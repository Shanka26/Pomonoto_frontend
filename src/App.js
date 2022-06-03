import logo from './logo.svg';
import {React, useState,useEffect } from 'react';

import { createTheme } from '@mui/material/styles';

import { ThemeProvider } from '@mui/system';
import { GlobalStyles as MuiGlobalStyles } from '@mui/material';
// import { AvoidSoftInput } from "react-native-avoid-softinput";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Registration from './components/Registration'
import Notes from './components/Notes'
import Login from './components/Login'

import Header from './components/Header';
import {DataProvider} from './context/DataContext'
import { Box } from '@material-ui/core';


 

const fontTheme = createTheme({
  typography: {
    fontFamily: [
      'Indie Flower',
      'cursive',
    ].join(','),
    
  },});

const theme = createTheme({
  palette: {
    primary: {
      light: '#b2dfdb',
      main: '#009688',
      dark: '#00695f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      'Indie Flower',
      'cursive',
    ].join(','),
    
  },
});


function App() {

  // let [setting,setSetting]=useState({session_time:"20",sBreak_time:"5",lBreak_time:"10",rounds:"3"})
  // let [tempSetting,setTempSetting]=useState({session_time:setting.session_time,  sBreak_time:setting.sBreak_time, lBreak_time:setting.lBreak_time,rounds:setting.rounds})
  // let [currentRound, setCurrentRound]=useState(1)
  // let [settingSession,setSettingSession]=useState(0)
  // let [settingShort,setSettingShort]=useState(5)
  // let [settingLong,setSettingLong]=useState(10)
  // let [settingRounds,setSettingRounds]=useState(3)
  // let [soundOn,setSoundOn]=useState(true)
  // const [anchorEl, setAnchorEl] = useState(null);
  // let[key , setKey]=useState(0)
  // const open = Boolean(anchorEl);

  // useEffect(()=>{
  //   // getSettings(1)
  //   // AvoidSoftInput.setAdjustNothing();
  //   // AvoidSoftInput.setEnabled(true);
    
  //   },[])

  //   const handleSettingsClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   }
  
  // const handleSettingsClose = () => {
  //   setAnchorEl(null);
  //   setTempSetting(setting)
  // };
  // const saveSettings=()=>{
  //   setKey(key+1)
  //   setSetting(tempSetting)
  //   setAnchorEl(null);
  // }
  
  // let getSettings = async(pk) =>{

  //   let response = await fetch(`https://pomonoto-api.herokuapp.com/settings/${pk}`)
  //   let data = await response.json()
    
  //   setSetting(data)
  //   setTempSetting(data)
    
    
  // }
  // let getRound=(round)=>{
  //   setCurrentRound(round)
  // }
  // let getSoundOn=(on)=>{
  //   setSoundOn(on)
  // }

  const theme = createTheme({
        palette: {
          primary: {
            light: '#b2dfdb',
            main: '#009688',
            dark: '#00695f',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
        },
        typography: {
          h5:{
            fontFamily: [
              'Indie Flower',
              'cursive',
            ].join(','),
            // fontSize:'1.8rem',
            margin:0
          }
        },
        

      
      });
        
    

  return (
    // body

    <Box sx={{backgroundColor:'primary', height: '100vh', }}>
      <BrowserRouter>
    <DataProvider>
            <ThemeProvider theme={theme}>
           
              <Header/>

              <Routes>
                
                <Route exact path="/" element={<Home/>}/>
               
                <Route exact path="/login" element={<Login />}/>
             
                <Route exact path="/register" element={<Registration />}/>
                <Route exact path="/notes" element={<Notes />}/>
              </Routes>
    
            </ThemeProvider>
      
    </DataProvider>
    </BrowserRouter>

    // </Box>
    
    // <Grid container sx={{bgcolor:theme.palette.primary.main,px:{
    //   xs: 3, // theme.breakpoints.up('xs')
    //   sm: 4, // theme.breakpoints.up('sm')
    //   md: 8, // theme.breakpoints.up('md')
    //   lg: 12, // theme.breakpoints.up('lg')
    //   xl: 20, // theme.breakpoints.up('xl')
    // },py:{
    //   xs: 2, // theme.breakpoints.up('xs')
    //   sm: 4, // theme.breakpoints.up('sm')
    //   md: 4, // theme.breakpoints.up('md')
    //   lg: 4, // theme.breakpoints.up('lg')
    //   xl: 4, // theme.breakpoints.up('xl')
    // },height:'100vh',pb:8}}>
    //   <Grid item container xs={12} justifyContent={'center'}>
        
    //   </Grid>
    //   {/* page */}
    //   <Grid item container sx={{boxShadow:3,borderRadius:1.5,bgcolor:theme.palette.primary.light,}}>
    //     {/* head */}
    //     <Grid item container alignItems={'top'}>
    //       {/* left */}
    //       <Grid item  xs={2} sx={{ml:1, mt:1}} justifyContent={'left'}>
    //         <Fab 
    //           id="demo-positioned-button"
    //           // <SettingsMenu menuClose={handleSettingsClose} anchor={anchorEl} open={open}/>
    //           aria-controls={open ?  SettingsMenu: undefined}
    //           aria-haspopup="true"
    //           aria-expanded={open ? 'true' : undefined}
    //           onClick={handleSettingsClick}
    //           size='small'
    //         >
    //           <SettingsIcon/>
    //         </Fab>
    //       </Grid>
    //       <ThemeProvider theme={theme}>
    //       <Menu
                      
    //                   id="settings-menu"
    //                   anchorEl={anchorEl}
    //                   open={open}
    //                   onClose={handleSettingsClose}
    //                   MenuListProps={{
    //                   'aria-labelledby': 'basic-button',
    //                   }}
                      
    //               >
                      
    //                   <Grid container alignItems={"center"} >
    //                       <Grid item  sx={{px:2}}>
    //                           Session Length: 
    //                       </Grid>
                        
    //                       <Grid item xs={9} justifyContent={"center"} >
    //                           <Slider size="small" sx={{mx:4}} min={1} max={60} step={1} valueLabelDisplay="auto" value={tempSetting.session_time}
    //                           onChange={(event,newValue)=>{setTempSetting({...tempSetting,'session_time':newValue})}}/>
    //                       </Grid>
    //                   </Grid>
  
    //                   <Grid container alignItems={"center"}>
    //                       <Grid item  sx={{px:2}}>
    //                           Short Break: 
    //                       </Grid>
    //                       <Grid item xs={9}>
    //                           <Slider size="small" sx={{mx:4}} min={1} max={60} step={1}  valueLabelDisplay="auto"value={tempSetting.sBreak_time} 
    //                           onChange={(event,newValue)=>{setTempSetting({...tempSetting,'sBreak_time':newValue})}}/>
    //                       </Grid>
    //                   </Grid>
  
    //                   <Grid container alignItems={"center"}>
    //                       <Grid item  sx={{px:2}}>
    //                           Long Break: 
    //                       </Grid>
    //                       <Grid item xs={9} >
    //                           <Slider size="small" sx={{mx:4}} min={1} max={60} step={1}  valueLabelDisplay="auto"value={tempSetting.lBreak_time}
    //                            onChange={(event,newValue)=>{setTempSetting({...tempSetting,'lBreak_time':newValue})}}/>
    //                       </Grid>
    //                   </Grid>
  
    //                   <Grid container alignItems={"center"}>
    //                       <Grid item  sx={{px:2}}>
    //                           Rounds Before Long Break: 
    //                       </Grid>
    //                       <Grid item xs={9} >
    //                           <Slider size="small" sx={{mx:4}} min={1} max={10} step={1}  valueLabelDisplay="auto" value={tempSetting.rounds}
    //                            onChange={(event,newValue)=>{setTempSetting({...tempSetting,'rounds':newValue})}}/>
    //                       </Grid>
    //                   </Grid>
                     
    //                   {/* <MenuItem onClick={cancelSettings} sx={{...settingsButtonStyle}}>Cancel</MenuItem> */}
    //                   <Grid container xs ={12} justifyContent="center">
    //                     <MenuItem sx={{}} onClick={saveSettings}>Save</MenuItem>
    //                   </Grid>
                      
    //               </Menu>
    //               </ThemeProvider>

          
    //       {/* center */}
    //       <Grid item container xs={8} justifyContent={'center'} sx={{m:2}}>
          
    //         <ThemeProvider theme={fontTheme}>
    //         <Timer key={key} sessionTime={setting.session_time} shortBreak={setting.sBreak_time} longBreak={setting.lBreak_time} rounds={setting.rounds}
    //         roundCallback={getRound} soundOn={soundOn}/>
    //         </ThemeProvider>
          
    //       </Grid>
    //       {/* right */}
    //       <Grid container xs={2} justifyContent={'right'}>
    //         <Grid item sx={{mr:1,mt:1}}>
    //           <SoundToggle onCallback={getSoundOn}/>
    //         </Grid>
    //       </Grid>
          
          
    //       <Grid item sx={{m:1}}>
    //         <Count round={currentRound}/>
    //       </Grid>

    //     </Grid>
    //      {/* body */}
    //     <Grid item container sx={{p:1}}>

    //       <Grid item xs={12} sx={{m:2}}>
    //         <Note round={currentRound}/>
    //       </Grid>
          
    //     </Grid>

    //   </Grid>
      

    //   <AppBar position="absolute" color="primary" sx={{ ml:4,top:0, bottom: 'auto',bgcolor:theme.palette.primary.dark}}>
        
    //       <Grid container alignItems={"center"} >
    //         <Grid item xs={8}>
    //         <ThemeProvider theme={fontTheme}>
    //           <Typography variant="h4" sx={{m:1}}>
    //             Pomonoto
    //           </Typography>
    //         </ThemeProvider>
    //         </Grid>
    //         <Grid item container xs={4} justifyContent='flex-end'>
    //           <Button variant="contained" disabled={true} sx={{mr:2,bgcolor:theme.palette.primary.main}}>Login</Button>
    //         </Grid>
    //       </Grid>
          
        
    //     </AppBar>
    // </Grid>
  );
}

export default App;
