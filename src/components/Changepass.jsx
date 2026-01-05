import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updatepassAPI } from '../services/allAPI';
import { toast } from 'react-toastify';


function Changepass() {


    const  userName = sessionStorage.getItem('username')
    console.log(userName);
    const users = userName.replace(/^"|"$/g, '').replace(/\\/g, '');       
    
    const [pass, setPass] = useState({
        username:users,
        password:"",
        newPassword:"",
        newChange:""
    })
   


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

   

    const changePassword = async(e)=>{
       e.preventDefault()
       if (pass.newChange !== pass.newPassword) {
        toast.error('New password and confirm password do not match');
        return; 
    }
        const result = await updatepassAPI(pass)
        if(result.status===200){
            toast.success('Password upated successfully')
            setShow(false)
        } else{
            toast.error('error while changing password')
        }
    }

    const handleClose2 =()=>{
        setPass({
            username:"",
            password:"",
            newPassword:"",
            newChange:""
        })
    };
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Change password
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className="col">
                            <div className="mb-3 w-75">
                                <label htmlFor="Name :">Enter Old Password</label>
                                <input type="password" className='form-control' placeholder=' Enter Old Password' value={pass.password} onChange={(e)=>setPass({...pass,password:e.target.value})} />
                            </div>
                            <div className="mb-3 w-75">
                                <label htmlFor="Name :">Enter New Password</label>
                                <input type="password" className='form-control' placeholder=' New Password' value={pass.newChange} onChange={(e)=>setPass({...pass,newChange:e.target.value})}/>
                            </div>
                            <div className="mb-3 w-75">
                                <label htmlFor="Name :">Confirm New Password</label>
                                <input type="password" className='form-control' placeholder=' Confirm New Password ' value={pass.newPassword} onChange={(e)=>setPass({...pass,newPassword:e.target.value})}/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={changePassword}>
                        Update Password
                    </Button>
                    <Button variant="danger" onClick={handleClose2}>
                        Reset
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Changepass