import React from "react";

export default function CardMovie(props){
    
    const { img , title , duration , synopsis , category  ,id } = props;
    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '2px 1px 2px 2px darkgray',
            height: '300px',
            color : 'white',
            backdropFilter: 'blur(10px)'
        }}>
        <div className="CardMovie" style={{
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '10px' ,
        }}>
            <div className="picMovie" style={{
                margin: '20px',
                fontWeight: 'bold'
            }}>
                <img src={img} alt="" style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: '10px'
                }}/>
            </div>   
            <div className="movieInformation" style={{ marginTop: '10px', textAlign: 'left' }}>
                <h2>{title}</h2>
                <h3>{duration}</h3>
                <span  style={{
                    backgroundColor:'seagreen',
                    borderRadius: '20px',
                    fontSize: '15px',
                    padding: ' 5px 8px'
                }} >{category} </span>
            </div>
            </div>
            <p style={{ paddingRight: '5px' ,
                        height: '110px',
                        overflow: 'auto',
                        fontSize: '16px',
                        textAlign: 'left',
                        paddingLeft:'20px',
                        fontFamily: ''
                        }}>
                            {synopsis} 
                        </p>
            <span style={{ 
                marginTop: '-55px',
                marginLeft: '130px'
             }}>Id : {id} </span>            
        </div>
    )
}