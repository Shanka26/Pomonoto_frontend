import {React, useState,useEffect} from 'react'
import { Fab, Grid,Stack,styled, TextField, Typography } from '@mui/material';
import Icon from '@mui/material/Icon';
import { clear } from '@testing-library/user-event/dist/clear';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import useSound from 'use-sound';
import bellSfx from '../Sounds/bell.mp3';
import gongSfx from '../Sounds/gong.mp3';
import { Box } from '@material-ui/core';





let fabStyle=
{
    backgroundColor:'primary.main',
    "&:hover":{
        backgroundColor: 'primary.dark'
    }
}

const Timer = ({sessionTime,shortBreak,longBreak,rounds,roundCallback,soundOn}) => {
    let [time,setTime]=useState(-1)
    let [currentRound,setCurrentRound]=useState(1)
    let [paused,setPaused]=useState(false)
    var interval
    let [playSessionStart]=useSound(bellSfx,{volume:0.25})
    let [playSessionEnd]=useSound(gongSfx,{volume:0.25})
    
    useEffect(() => {

        handleTimer(5)
        // console.log('boop')
    },[])

    useEffect(() => {
        clearInterval(interval)
        // console.log(time)
        interval= setInterval(() => {
            // console.log(time)
            clearInterval(interval)
            if(!paused){
                clearInterval(interval)
                if (time>0){
                setTime(time-1) 
                }
                else if(time==0){
                    
                    // playSessionStart()
                    setTime(-1)
                    setCurrentRound(currentRound+1)
                    // roundSetupTimer()
                }
        }
        clearInterval(interval)
        },1000)

    },)
    useEffect(() => {
        clearInterval(interval)
        roundSetupTimer()
        roundCallback(currentRound)
        if(soundOn){
            currentRound%2==0?playSessionEnd():playSessionStart()
        }
        
        
    },[currentRound])
    
    let timeFormat=(time)=>{
        let min,sec=0
        if(time>60){
            min= Math.trunc(time/60)
        }
        else{
            min=0
        }
        sec =time%60

        
        sec=sec>=10?sec:'0'+sec
        return(min+":"+sec)
        
    }
    let roundSetupTimer=()=>{
        // console.log(currentRound)
        if (currentRound%(rounds*2)==0){
            setTime(longBreak*60)
        }
        else if (currentRound%2==1){
            setTime(sessionTime*60)
        }
        else{
            setTime(shortBreak*60)
        }
        
    }
    let handleTimer=(command)=> {
        if(command==0){
            clearInterval(interval)
            setPaused(!paused)
        }
        else if (command==1){
            clearInterval(interval)
            
            setCurrentRound(currentRound+1)
            // roundSetupTimer()
            if(paused){
                setPaused(false)
            }

        }
        else if (command==2){
            if (currentRound>1){
                clearInterval(interval)
                setCurrentRound(currentRound-1)
                
                // roundSetupTimer()
                if(paused){
                    setPaused(false)
                }
            }

        }
        else{
            // console.log("when??????????????????????????")
            
            setPaused(true)
            setTime(-1)
            clearInterval(interval)
            setPaused(false)
            setCurrentRound(1)
            roundSetupTimer()
            
            
            // console.log(time)
            
            // setCurrentRound(1)  
            // roundSetupTimer()
            
            // setPaused(false)
        }
    }

    document.title = timeFormat(time)

    const TimeText=styled(Typography)({
        margin:0,
        
    });
  return (
      <Box mx={4}>
          <Stack gap={2} justifyContent='center' align='center' sx={{marginLeft:4, marginRight:4}}>
        
            
        <TimeText variant="h5" fontSize={100} >
            {timeFormat(time)}
        </TimeText>

    

    <Stack direction="row" gap={{xs:1,sm:2,xl:3}} sx={{marginLeft:4, marginRight:4}}>

        <Fab  onClick={()=>{handleTimer(2)}}  sx={fabStyle}>
            <ArrowBack/>
        </Fab>


        <Fab   onClick={()=>{handleTimer(5)}} sx={fabStyle}>
        <RestartAltIcon/>
        </Fab>
    
        <Fab   onClick={()=>{handleTimer(0)}} sx={fabStyle}> 
            {paused?<PlayArrowIcon/>:<PauseIcon/>}
        </Fab>
    

        <Fab  onClick={()=>{handleTimer(1)}} sx={fabStyle}>
            <ArrowForward/>
        </Fab>

    </Stack>




</Stack>
      </Box>
    
  )
}

export default Timer