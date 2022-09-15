import React, { useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CardBroadcast(props){
    const { img , title , date , time , room , id} = props
    const [open, setOpen] = React.useState(false);
    const [ displ , isDispl ] = useState(true)
    const handleOpen = () => {
        setOpen(true)
        console.log(id);
    };
    const handleClose = () => setOpen(false);

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

    return (
     <>   
    <div style={{ display : displ ? 'block' : 'none' }}>
       
            
        <div id="mock">
        <img src={img} onClick={handleOpen} style={{ width: '250px' , height: '250px' , borderRadius:'5px'}} />
            </div>   
        
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Day : {date}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           At : {time}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Room : {room}
          </Typography>
          
          <div  >
          <DeleteIcon sx={{ cursor: 'pointer', mt:'2' }} onClick={()=> {
                axios.delete(`http://localhost:8080/broadcast/${id}`).then((res) => {
                    console.log(res);
                    console.log(res.data);
                })
                setOpen(false);
                isDispl(false);
            }} />
          </div>
            
        </Box>
      </Modal>
    </div>
    </>
    )
}