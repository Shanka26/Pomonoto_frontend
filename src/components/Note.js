import {Box } from '@material-ui/core'
import {TextField } from '@mui/material'
import {React,useState,useEffect, useContext} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import DataContext from '../context/DataContext';
import useAxios from '../utils/useAxios'
import { useTheme } from '@mui/material/styles';



const Note = ({round}) => {
    
    let{user,userNote} = useContext(DataContext)
    let [note,setNote]=useState("")
    let [savedNote,setSavedNote]=useState(userNote)
    let [thoughts,setThoughts]=useState(0)
    let created = false
    let server =useAxios()
    const theme = useTheme()
    const lg_up = useMediaQuery(theme.breakpoints.up('lg'));


    

    useEffect(() => {
        
        if(user){
        noteGet()  
        setSavedNote(userNote)
        
        }
        
    },[])

    useEffect(() => {
        if(user)notePut()
    },[savedNote])

    //get user noooooooooooo get NOTE
    //does user ave note?
    //make note for
    //else put

  

    let saveNote=(key)=>{

        if(key==='Enter'&&round%2===1){

            if(note!==""){

                setSavedNote(thoughts>0?savedNote+"\n"+note:savedNote+note)
                setNote("")
                setThoughts(thoughts+1)
                
                

                if(!created){
                    // notePost()
                    created=true
                }
                else{ 
                    console.log("nore  putted")
                    // notePut()
                }
                
               
            }
        }
    }


    
    let noteGet=()=>{
        
        server.get(`user/notes/`, {
            // Authorization: 'Bearer ' +authTokens.access,
            
        }).then((response)=>{
            
            setSavedNote(response.data[0].body)
            localStorage.setItem('userNote',response.data[0].body)})

        }


    let notePut=()=>{
        server.put(`user/note/`, {
            // email:id,
            body:savedNote

        }).then((response)=>{


        })
        }
    let handelNoteChange=(value)=>{
        if (round%2===1){
            setNote(value)
            if(value.trim()===''){
                setNote("")
            }

            }
        else{
            setSavedNote(value)
        }
        
        
    }
    return (
      
   <Box sx={{display:'flex', width:'100%'}}>
 
       <TextField variant='standard' multiline rows={lg_up?16:8} fullWidth label={round%2===1?'Write away your distractions':'See your thoughts'}
                placeholder="Press enter to send your distracting thoughts away"
                InputProps={{
                    disableUnderline: true,
                    style: {fontSize: "1.5rem"},
                    // readOnly: round % 2==0,

                  }}
                  sx={{padding:4}}
                  InputLabelProps={{style: {fontSize:"1.6rem"}}}
                value={round%2===1?note:savedNote} onChange={e=>{handelNoteChange(e.target.value)}}  
                onKeyPress={e=>{saveNote(e.key)}}
                >

                
                </TextField>


   </Box>
            
                /* <Grid item sx={{ml:60,mb:120}}>
                    <Fab >
                        <SaveOutlinedIcon/>
                        <SaveIcon/>
                    </Fab>
                </Grid>   */
         
  )
}

export default Note