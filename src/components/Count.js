import React from 'react'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { Grid } from '@material-ui/core';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';

const Count = ({round}) => {

  const theme = useTheme()
  const sm_up = useMediaQuery(theme.breakpoints.up('sm'));
   
  return (
      <Box  mt={2}>

    {[...Array(parseInt(round/2))].map((e, i) => <HourglassBottomIcon fontSize={sm_up?'large':'medium'} key={i}/> )}


    {/* {[...Array(round-1)].map((e, i) => <HourglassTopIcon key={i}/>)} */}
    {round%2==1&&<HourglassTopIcon fontSize={sm_up?'large':'medium'} />}
    {/* <HourglassTopIcon /> */}
    </Box>
  )
}

export default Count