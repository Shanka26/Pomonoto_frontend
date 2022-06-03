import { Grid } from '@material-ui/core'
import {React, useState} from 'react'
import OpenNote from './OpenNote'


const Notes = () => {
    let [notes,setNotes] = useState(['oop','oop','oop'])
  return (
    <Grid container>
        <Grid container item>
            {notes.map((note, index)=>(
                <Grid item  xs={3}key={index}>
                    <OpenNote/>
                </Grid>
            ))}
        </Grid>
    </Grid>
  )
}

export default Notes