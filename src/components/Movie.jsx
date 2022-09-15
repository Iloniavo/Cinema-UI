
import axios from "axios";
import React, { useEffect, useState } from "react"
import CardMovie from "./CardMovie";
import { useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { experimentalStyled as styled } from '@mui/material/styles';
import{ Box , Modal}from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Navbar from './NavBar';
import AddIcon from '@mui/icons-material/Add';

export default function Movie(){

  const [open, setOpen] = React.useState(false);
    const [ result , setResult ] = useState([]);
    const [ title , setTitle ] = useState();
    const [ titre , setTitre ] = useState("");
    const [ category , setCategory ] = useState("");
    const [ duration , setDuration ] = useState("");
    const [ image_url , setImage_url ] = useState("");
    const [ synopsis , setSynopsis ] = useState("")

    const categories = [ "Action" , "Romance" , "Crime" , "Documentary" , "Thriller" , "Adventure" , "Animation" , "Sci-Fi" , "Musical" , "Drama" , "Horror" ]

    const navigate = useNavigate();
    const ariaLabel = { 'aria-label': 'description' };

    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));

    useEffect(()=>{
        const promise = axios.get('http://localhost:8080/movies');
        promise.then((response) => {
          console.log(response);
          setResult(response.data)
        }).catch((error)=>{
          console.error(error)
        })
    }, [])

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
    const handleSubmit = ()=> {
      axios.post('http://localhost:8080/movies', { title : titre , duration : duration , category : category , image_url : image_url , synopsis : synopsis })
      .then((response) => console.log(response.data)).catch((error)=> console.log(error));
      setOpen(false)
   }  

   const handleOpen = () => {
    setOpen(true)
   };
  const handleClose = () => setOpen(false);


    return (
      <>
        <Navbar/>

        <>
        <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
              <Box sx={style}>
                  <div className="mb-3">
                      <label htmlFor="exampleFormControlInput5" className="form-label">Title</label>
                      <input type="text" className="form-control" id="exampleFormControlInput5" placeholder="title" value={titre} onChange={(e)=>{
                        setTitre(e.target.value)
                      }} />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Duration </label>
                      <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="hh:mm:ss" value={duration} onChange={(e)=>{
                        setDuration(e.target.value)
                      }} />
                  </div>
                  <select class="form-select" aria-label="Default select example" value={category} onChange={(e)=> setCategory(e.target.value) }>
                    <option selected>Category</option>
                      {categories.map((item, i) => {
                        return <option value={i}>{item}</option>
                      })}
                  </select>
                  <div className="mb-3">
                      <label htmlFor="exampleFormControlInput3" className="form-label">Image Url</label>
                      <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="imageUrl" value={image_url} onChange={(e)=>{
                        setImage_url(e.target.value)
                      }}/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleFormControlInput4" className="form-label"></label>
                      <input type="text" className="form-control" id="exampleFormControlInput4" placeholder="synopsis" value={synopsis} onChange={(e)=>{
                        setSynopsis(e.target.value)
                      }}/>
                  </div>
                  <div className="col-auto">
                    <button  className="btn btn-primary mb-3" onClick={handleSubmit}>Confirm</button>
                  </div>
        </Box>
      </Modal>
        </>

        <div style={{
            display: 'flex',
            flexDirection : 'row',
        }} >
            <div style={{
                marginLeft: '100px',
                marginTop: '200px'
            }}>
            <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
                sx={{ paddingLeft: '50px' }}
                >
                  <Button onClick={()=>{
                      navigate(`/movies`)
                        axios.get(`http://localhost:8080/movies`).then((response) => {
                              console.log(response);
                              setResult(response.data)
                            }).catch((error)=>{
                              console.error(error)
                            })
                        
                      }}>All</Button>
                 {categories.map((item, i)=> {
                   return <Button key={i} onClick={()=>{
                    navigate(`/categories/${item}`)
                      axios.get(`http://localhost:8080/categories/${item}`).then((response) => {
                            console.log(response);
                            setResult(response.data)
                          }).catch((error)=>{
                            console.error(error)
                          })
                      
                    }}>{item}</Button>
                   
                 })} 
                  
      </ButtonGroup>
            </div>
            
            <div className="movies" style={{
                margin: 'auto',
                marginTop: '140px',
                width: '60%',
                height: '700px',
                overflow: 'auto'

            }}>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8 }}>
                    {result.map((item, index) => (
                    <Grid item xs={2} sm={4} key={index} >
                      <Item sx={{
                        background: 'none'
                      }} >
                        <CardMovie title={item.title} duration={item.duration} synopsis={item.synopsis} category={item.category} img={item.image_url} id={item.id}/>
                      </Item>
                    </Grid>
                  ))}
                </Grid>
            </div>
            <div style={{
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '150px'
            }}>
                <Input placeholder="Search by title here" sx={{ mb : 5 , color: '#5E8BF3' , fontWeight: 'bolder' , fontSize: '20px' , backgroundColor: 'whitesmoke'}} inputProps={ariaLabel} onChange={(e)=> {
                    setTitle(e.target.value)
                    axios.get(`http://localhost:8080/movies/${title}`).then((response) => {
                      console.log(response);
                      setResult(response.data);
                    }).catch((error) => console.log(error))
                }} />  
                 <button className="btn btn-outline-primary" onClick={handleOpen} style={{ marginTop: '200px', cursor: 'pointer' }}>Add <AddIcon/> </button>
            </div>
        </div>
        </>
    )
}