import React, { useEffect, useState } from 'react'
import Header from './Header'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import formimage from '../Assests/formimage.png'
import Forms from './Forms';




function Home() {

  const [username, setUsername] = useState("")

  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  },[])

  return (
    <>
      <Header home />
      <h2 className='mt-3 ms-3'>Welcome <span className='text-warning'>{username}</span></h2>

      <div className='card shadow mt-3 p-4 d-flex justify-content-center align-items-center'>
        
          <div className='card shadow rounded p-5'>
            
            <Card className='align-items-center' style={{ width: '18rem' }}>
              <Card.Img variant="top" src={formimage}/>
              <Card.Body>
                
               <p>  Please click below button to fill the form </p>
                <Button className="btn btn-success mt-4 "><Forms/>
                 
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </>
   

  )
}

export default Home