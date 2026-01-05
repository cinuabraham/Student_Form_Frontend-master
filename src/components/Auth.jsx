import React, { useState } from 'react'
import image from '../Assests/image.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, navigate, useNavigate} from 'react-router-dom';
import { loginAPI, signupAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Auth({ signup }) {

    const [userData, setUserData]=useState ({
        name:"",
        username:"",
        password:"",
        gender:"",
        address:""

    })
  

    const navigate = useNavigate()
    /*console.log(userData);*/

   
    const SignupForm = signup ? true : false

    //Signup
   const handlesignup =async(e)=>{
    e.preventDefault()
   
     
    const {name,username,password,gender,address} = userData

    if(!name || !username || !password ||!gender ||!address){
        
        toast.info('Please fill the signup form completely')
    }
    else{
        const result = await signupAPI(userData)
        console.log(result);
        if(result.status===200){
            toast.success(`${result.data.name} Registered Successfully`)
            setUserData({
                name:"",
                username:"",
                password:"",
                gender:"",
                address:""
            })
            navigate('/login')
        }
       else{
        toast.error(`${result.response.data}`)
       }
    }
   }
   //login

   const handlelogin = async(e)=>{
    e.preventDefault()

    const {username,password} = userData

    if(!username || !password){
        toast.info(`Please fill the login form`)
    }
    else{
        const result = await loginAPI(userData)
        console.log(result);

        if(result.status===200){
            //store data
            sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
            sessionStorage.setItem("username",JSON.stringify(result.data.existingUser.username))
            sessionStorage.setItem("token",result.data.token)

            toast.success(`login Successfull`)

            setUserData({
                username:"",
                password:""
            })
            setTimeout(()=>{
                navigate('/home')
              },2000)
        }
        else{
            toast.error(`${result.response.data}`)
           }
    }
   }

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
                                <h1>{SignupForm ? "Student SignUP":"Student Login "} <i class="fa-solid fa-envelope"></i></h1>

                                <h5 className=' ms-3 mt-4'> {
                                    SignupForm ?
                                        " Sign Up to your Account" : " Login to your Account"}</h5>

                                <Form className= ' w-100 p-5'>

                                    {SignupForm &&
                                        <Form.Group className="   mb-3" controlId="formBasicEmail">
                                            <Form.Control  className='form-control'type="text" placeholder=" Enter Full Name" value={userData.name} onChange={(e)=>setUserData({...userData,name:e.target.value})}required /> 
                                        </Form.Group>}

                                    <Form.Group className="  mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder=" Enter Username" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} required /> 
                                        
                                    </Form.Group>

                                    <Form.Group className="  mb-3" controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Enter Password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} required /> 

                                        {
                                            SignupForm &&
                                            <Form.Group className=" mb-3 mt-2" controlId="formBasicEmail">
                                                <input name="gender" type="radio" id='Male' value="male"  onChange={(e)=>setUserData({...userData,gender:e.target.value})} required/>
     
                                                <label htmlFor="Male">Male</label> &nbsp;

                                                <input name="gender" type="radio" id='Female' value="female" onChange={(e)=>setUserData({...userData,gender:e.target.value})} required/>
                                                <label htmlFor="Female">Female</label>
                                            </Form.Group>}
                                    </Form.Group>
                                   { SignupForm &&
                                    <Form.Group className=" mb-3" controlId="formBasicEmail">
                                        <Form.Control as="textarea" placeholder=" Enter Residential Address" value={userData.address} onChange={(e)=>setUserData({...userData,address:e.target.value})}required/> 
                                    </Form.Group>
                                   }
                                  { SignupForm ?
                                   <div>
                                        <Button onClick={handlesignup} className='btn btn-warning mt-4'>Sign Up</Button>
                                        <p className='text-light' >Existing User? Click Here to <Link to={'/login'}>Login</Link></p>
                                    </div> :

                                    <div>
                                        <Button onClick={handlelogin} className='btn btn-warning mt-4'>Login</Button>
                                        <p className='text-light'>New User? Click Here to <Link to={'/signup'}>Sign Up</Link></p>
                                    </div>
                                    }
                                </Form>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <ToastContainer theme='colored' autoClose={2000} position='top-center' />

        </div>
        
        
    )
}


export default Auth