import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { GET_ADMIN_ENDPOINT, PORT } from "../constants";


export function AdminLogin(){

const [formData, setFormData] = useState<{UserId:string; Password:string;}>({UserId: "", Password: ""});
const navigate = useNavigate();
const cookie = useCookies();

function handleUserChange(e:any){
    setFormData({
        UserId:e.target.value,
        Password:`${formData?.Password}`
    })
}

function handlePassword(e:any){
    setFormData({
        UserId:`${formData?.UserId}`,
        Password:e.target.value
    })
}

function handleSubmit(e:any){
    e.preventDefault();
    axios.get(`${PORT}/${GET_ADMIN_ENDPOINT}`)
    .then( (response) => {
       let admin = response.data.find((admin:any) => admin.UserId === formData?.UserId )
       if(admin?.Password===formData?.Password){
         
         cookie[1]('admin', formData?.UserId);
         navigate('/admin');
       }else{
         alert("Invalid Credentials!");
       }
    })
}


    return(
        <div style={{height:"85vh"}} className="d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="shadow p-3 border border-1 rounded-2 " action="">
                <span className="fs-3 fw-medium">Admin Login</span>
                <dl>
                    <dt>Username</dt>
                    <dd><input required className="form-control" onChange={handleUserChange} type="text" /></dd>
                    <dt>Password</dt>
                    <dd><input required className="form-control" onChange={handlePassword} type="password" /></dd>
                </dl>
                <button className="btn btn-info w-100">Login</button>
            </form>
        </div>
    )
}