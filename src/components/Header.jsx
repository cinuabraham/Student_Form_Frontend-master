import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Changepass from './Changepass';




function Header() {

  const navigate = useNavigate()
  const handleLogout =()=>{
   
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    navigate('/')
  }
  return (
    
    <Navbar className="bg-info p-3">
        <Container>
          <Link to={'/login'} style={{textDecoration:'none'}}>
              <Navbar.Brand className='text-light'>
                <i class="fa-solid fa-envelope"></i> {''}
                <span className='fs-3'>Home</span>
                </Navbar.Brand>
          </Link>
 
           <Changepass/>
          <button onClick={handleLogout} className='btn btn-warning'>Logout <i class="fa-solid fa-power-off"></i></button>

        </Container>
      </Navbar>
  )
}

export default Header