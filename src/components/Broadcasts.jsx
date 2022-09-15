import axios from "axios";
import React, { useEffect, useState } from "react"
import CardBroadcast from './CardBroadcast';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {  Modal , Box , Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function Broadcasts(){

     const [open, setOpen] = React.useState(false);
     const [ date , setDate ] = useState("");
     const [ time , setTime ] = useState("");
     const [ movieId , setMovieId ] = useState("");
     const [ roomId , setRoomId ] = useState("")

     const handleSubmit = ()=> {
        axios.post('http://localhost:8080/broadcasts', { date : date , time : time , movie_id : movieId , room_id : roomId })
        .then((response) => console.log(response.data)).catch((error)=> console.log(error));
        setOpen(false)
     }

     const handleOpen = () => {
      setOpen(true)
     };
    const handleClose = () => setOpen(false);

    const [ result , setResult ] = useState([]);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        color: 'white',
        bgcolor: 'black',
        boxShadow: 24,
        p: 4,
      };
    useEffect(()=>{
        axios.get('http://localhost:8080/broadcasts').then((response)=>{
          setResult(response.data)
          console.log(result)
        }
        ).catch((error)=> console.log(error))
    },[])

    

    return (
        <div > 
         
            <div> 
            <button className="btn btn-outline-primary" onClick={handleOpen} style={{ marginTop: '200px', cursor: 'pointer' }}>Add <AddIcon/> </button>
            <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
              <Box sx={style}>
                  <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Movie's Id</label>
                      <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="idMovie" value={movieId} onChange={(e)=>{
                        setMovieId(e.target.value)
                      }} />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleFormControlInput2" className="form-label">Date</label>
                      <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="yyyy-mm-dd" value={date} onChange={(e)=>{
                        setDate(e.target.value)
                      }}/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleFormControlInput3" className="form-label">Time</label>
                      <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="hh:mm:ss" value={time} onChange={(e)=>{
                        setTime(e.target.value)
                      }}/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleFormControlInput4" className="form-label"></label>
                      <input type="number" className="form-control" id="exampleFormControlInput4" placeholder="idRoom" value={roomId} onChange={(e)=>{
                        setRoomId(e.target.value)
                      }}/>
                  </div>
                  <div className="col-auto">
                    <button  className="btn btn-primary mb-3" onClick={handleSubmit}>Confirm</button>
                  </div>
                  
        </Box>
      </Modal>
              </div>
            
            <div style={{
            width: '60%',
            paddingTop: '150px',
            margin: 'auto',
            marginBottom: '10vh',
                height: '700px',
                overflow: 'auto'
        }}> 
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8 , md: 12}}>
                    {result.map((item, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} >
                      <Item sx={{ background: 'none' }}>
                        <CardBroadcast img={item.movie.image_url} title={item.movie.title} date={item.date} id={item.id} time={item.time} room={item.room.id}/>
                      </Item>
                    </Grid>
                  ))}
                </Grid>
                </div>
            
        </div>
    )
    }