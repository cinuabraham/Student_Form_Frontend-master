import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"

//sign up API
export const signupAPI =async(users)=>{
   return await commonAPI('POST',`${BASE_URL}/user/signup`,users,"")

}

//login API
export const loginAPI =async(users)=>{
   return await commonAPI('POST',`${BASE_URL}/user/login`,users,"")

}

//logic to submit API
export const submitAPI  = async(reqBody,reqHeader)=>{
   return await commonAPI('POST',`${BASE_URL}/formdatas/submit`,reqBody,reqHeader)

}

//update password

export const updatepassAPI =async(users)=>{
   return await commonAPI('PUT',`${BASE_URL}/user/updatepassword`,users,"")

}