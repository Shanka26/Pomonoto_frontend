import { Menu, MenuItem,Slider,Grid } from '@mui/material'
import {React, useState} from 'react'

const SettingsMenu = ({menuClose,anchor,open}) => {
let [sessionTime,setSessionTime]=useState(0)

  return (
    <Menu
                      sx={{}}
                      id="settings-menu"
                      anchorEl={anchor}
                      open={open}
                      onClose={()=>menuClose()}
                      MenuListProps={{
                      'aria-labelledby': 'basic-button',
                      }}
                      
                  >
                      
                      <Grid container alignItems={"center"} >
                          <Grid item  sx={{px:2}}>
                              Session Length: 
                          </Grid>
                          <Grid item xs={8} sx={{mx:4}}>
                          
                              <Slider min={0} max={60} step={5} marks valueLabelDisplay="auto" value={sessionTime}
                               onChange={(event,newValue)=>{setSessionTime({newValue})}}/>
                          </Grid>
                      </Grid>
  
                      {/* <Grid container alignItems={"center"}>
                          <Grid item  sx={{px:2}}>
                              Short Break: 
                          </Grid>
                          <Grid item xs={8} sx={{mx:4}}>
                              <Slider  min={0} max={60} step={5} marks valueLabelDisplay="auto"value={data?.sBreak_time} onChange={(event,newValue)=>{setSetting({...setting,'sBreak_time':newValue})}}/>
                          </Grid>
                      </Grid>
  
                      <Grid container alignItems={"center"}>
                          <Grid item  sx={{px:2}}>
                              Long Break: 
                          </Grid>
                          <Grid item xs={8} sx={{mx:4}}>
                              <Slider  min={0} max={60} step={5} marks valueLabelDisplay="auto"value={data?.lBreak_time} onChange={(event,newValue)=>{setSetting({...setting,'lBreak_time':newValue})}}/>
                          </Grid>
                      </Grid>
  
                      <Grid container alignItems={"center"}>
                          <Grid item  sx={{px:2}}>
                              Rounds Before Long Break: 
                          </Grid>
                          <Grid item xs={8} sx={{mx:4}}>
                              <Slider min={1} max={10} step={1} marks valueLabelDisplay="auto"value={data?.rounds} onChange={(event,newValue)=>{setSetting({...setting,'rounds':newValue})}}/>
                          </Grid>
                      </Grid> */}
                     
                      {/* <MenuItem onClick={cancelSettings} sx={{...settingsButtonStyle}}>Cancel</MenuItem>
                      <MenuItem onClick={saveSettings} sx={{...settingsButtonStyle}}>Save</MenuItem> */}
                  </Menu>
  )
}

export default SettingsMenu