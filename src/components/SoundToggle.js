import {React,useState} from 'react'
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Grid, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const SoundToggle = ({onCallback}) => {
    let[on,setOn]=useState(true)
    const theme = useTheme()
    const sm_up = useMediaQuery(theme.breakpoints.up('sm'));


    let handleClick = () => {
        
        setOn(!on)
        onCallback(!on)

    }
  return (
    <Box>
        <IconButton onClick={handleClick}>
            {on?<VolumeOffIcon fontSize={sm_up?'large':'medium'}/>:<VolumeUpIcon fontSize={sm_up?'large':'medium'}/>}
            
        </IconButton>
        {on}
    </Box>
  )
}

export default SoundToggle