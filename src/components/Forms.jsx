import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { submitAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Forms() {

    const [formlogin, setFormlogin] = useState({

        email:"",
        DOB:"",
        age:"",
        department:"",
        Bloodgroup:"",
        IdImage :"",
        comment:""

    })

  

    const [show, setShow] = useState(false);
//state to hold token
const [token, setToken] = useState("")

useEffect(()=>{
 if(sessionStorage.getItem("token")) {
    setToken(sessionStorage.getItem("token"))
 }
},[])

    console.log(formlogin);
    
    const handleClose = () =>{ 
        setShow(false)
    }
    const handleClose1 =()=>{
        setFormlogin({
            email:"",
            DOB:"",
            age:"",
            department:"",
            Bloodgroup:"",
            IdImage :"",
            comment:""
        })
      
    };
    const handleShow = () => setShow(true);
    

    //function to submit

    const handleSubmit =async(e)=>{
        e.preventDefault()

        const{ email, DOB, age, department, Bloodgroup, IdImage , comment }= formlogin

        if(!email || !DOB ||!age ||!department ||!Bloodgroup ||!IdImage ||! comment ){
            toast.info(`Please fill the form completely`)
        }
        else{
              //reqBody
              const reqBody = new FormData()

              reqBody.append("email",email)
              reqBody.append("DOB",DOB)
              reqBody.append("age",age)
              reqBody.append("department",department)
              reqBody.append("Bloodgroup",Bloodgroup)
              reqBody.append("IdImage",IdImage)
              reqBody.append("comment",comment)

              if(token){const reqHeader = {
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
              }

            const result = await submitAPI(reqBody,reqHeader)
            console.log(result);
            if(result.status===200){
               console.log(result.data);
               handleClose()
                toast.success(`Form data added successfully`)
            }
            else{
                toast.error(`${result.response.data}`)
                handleClose()
            }
            }
        }
    }

    return (
        <>
           <>

                <Button variant="success" onClick={handleShow}>
                    Click Here
                </Button>
    
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please fill the personal details below:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
    
                        <div className="row ">
    
                            <div className="col need-validation" >
                                <div className="form-group was-validated mb-3 w-100">
                                    <label htmlFor="Name :">Email Id:</label>
                                    <input type="email" className='form-control'  placeholder='Email ID' value={formlogin.email} onChange={(e)=>setFormlogin({...formlogin,email:e.target.value})}/> <div className="invalid-feedback">Please enter your email</div>
                                </div>
                                <div className=" form-group was-validated mb-3 w-100">
                                    <label htmlFor="Name :">DOB:</label>
                                    <input type="date" className='form-control' placeholder='Date of Birth (DOB)'  value={formlogin.DOB} onChange={(e)=>setFormlogin({...formlogin,DOB:e.target.value})} /> <div className="invalid-feedback">Please Enter DOB</div>
                                </div>
                                <div className=" mb-3 w-100">
                                    <label htmlFor="Name :">Age:</label>
                                    <input type="number" min={'18'} className='form-control' placeholder='Age' value={formlogin.age} onChange={(e)=>setFormlogin({...formlogin,age:e.target.value})} />
                                </div>
                                <div className=" was-validated mb-3 w-100" >
                                    <label htmlFor="Name :">Department:</label><br />
                                    <input name="department"  type="radio" id='Married' value="Computer Science" onChange={(e)=>setFormlogin({...formlogin,department:e.target.value})} />&nbsp;
                                    <label htmlFor="CS">Computer Science</label> &nbsp;
    
                                    <input name="department" type="radio" id='Unmarried' value="Electronics" selected onChange={(e)=>setFormlogin({...formlogin,department:e.target.value})} />&nbsp;
                                    <label htmlFor="ECE">Electronics</label>&nbsp;
                                    <input name="department" type="radio" id='Others' value="Others" onChange={(e)=>setFormlogin({...formlogin,department:e.target.value})} />&nbsp;
                                    <label htmlFor="others">Others</label>
                                    
                                </div>
    
                                <div>
                                    <label className='p-2' htmlFor="country" >Blood Group</label>
                                    <select className="w-full p-2 border rounded mb-2" onChange={(e)=>setFormlogin({...formlogin,Bloodgroup:e.target.value})} >
                                    <option value="Null" selected></option>
                                        <option value="o+">O<sup>+</sup></option>
                                        <option value="o-">O<sup>-</sup></option>
                                        <option value="AB+">AB<sup>+</sup></option>
                                        <option value="A+">A<sup>+</sup></option>
                                        <option value="others" >Other</option>
                                    </select>
    
                                </div>
                                <div className="  mb-3 w-100" >
                                   <div>
                                        <label >ID card Upload</label><br />
                                        <input id='upload' type="file" onChange={(e)=>setFormlogin({...formlogin,IdImage:e.target.files[0]})}  className=" form-control w-full p-2 border rounded"  />
                                   </div>
                                    
                                </div>
                                <div className=" mb-3 w-100">
                                    <textarea name="" id="comment" placeholder='Comments' className='form-control' value={formlogin.comment} onChange={(e)=>setFormlogin({...formlogin,comment:e.target.value})}></textarea>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose1} >
                            Reset 
                        </Button>
                        <Button variant="success" onClick={handleSubmit}>
                            Submit
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
                
         </>
         <ToastContainer theme='colored' autoClose={2000} position='top-center' />
        </>
        
    )
}

export default Forms