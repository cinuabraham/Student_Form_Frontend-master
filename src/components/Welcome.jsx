import React from 'react'
import image from '../Assests/image.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link} from 'react-router-dom';

function Welcome() {
  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
            <div className='w-75 container'>
                <div className='card shadow bg-info rounded p-5'>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img src={image} alt="no image" className='w-100' />
                        </div>
                        <div className="col-lg-6">
                            <div className='d-flex align-items-center justify-content-center flex-column'>
                            

                                <Form className='w-100 p-5'>

                                   
                                      <div className='d-flex align-items-center justify-content-center flex-column'>
                                      <h2 >  Welcome Students <i class="fa-solid fa-envelope"></i></h2>
                                        </div>
                                  
                                 
                                   <div className='d-flex align-items-center justify-content-center flex-column'>
                                        <Link to={'/login'}><Button  className='btn btn-warning mt-5 p-2'> Please Sign in </Button></Link>
                                       
                                    </div> 
                                    
                                </Form>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
         

        </div>
        
        
  )
}

export default Welcome