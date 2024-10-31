
import { Alert } from "@mui/material";
import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { number, object, string, InferType} from "yup";


export function Register(){

    const [users, setUsers] = useState([{}]);
    const navigate = useNavigate();
    const [button, setButton] = useState(false);
    const cookie = useCookies(['email']);

    function handleCustomChange(e){
      setButton(false);
      signInForm.handleChange(e)
    }
   
    const userSchema = object({
      UserId: string().required().min(5),
      Password: string().required().min(6, "Minimum 6 digits"),
      Email: string().email(),
      Mobile: number().min(10, "Minimum 10 digits")
    })


    const signInForm = useFormik({
       initialValues:{
         UserId:"",
         Password:"",
         Email:"",
         Mobile:0
       },

       onSubmit: (values)=>{
          let User = users.find(user => values.Email === user.Email);
          console.log(User)
          if(User?.Email === values.Email){
            setButton(true);
          }else if(User?.Email===undefined){
            axios.post('http://127.0.0.1:2200/add-user', values)
            .then(()=>{
              alert("User Registered!");
              cookie[1]('email', values.Email)
              navigate('/dashboard');
            })
          }   
       },

       validationSchema: userSchema

    })



    useEffect(()=>{
        axios.get("http://127.0.0.1:2200/get-users")
        .then(response => {
           setUsers(response.data);
        }
        )
    },[])

    return(
        <div style={{height:"85vh"}} className="d-flex justify-content-center align-items-center">
            <div style={{top:"50px"}} className="position-absolute">{button?<Alert severity="warning">Email already found</Alert>:''}</div>
            <form onSubmit={signInForm.handleSubmit} className="border shadow p-3 rounded-3">
               <span className="fs-3 mb-2 h3">Register</span>
                <dl>
                    <dt>Username</dt>
                    <dd><input className="form-control" onBlur={signInForm.handleBlur} onChange={signInForm.handleChange} name="UserId" type="text" value={signInForm.values.UserId} /></dd>
                    {signInForm.errors.UserId?<div className="text-danger">{signInForm.errors.UserId}</div>:null}
                    <dt>Password</dt>
                    <dd><input className="form-control" onChange={signInForm.handleChange} name="Password" type="password" /></dd>
                    {signInForm.errors.Password?<div className="text-danger">{signInForm.errors.Password}</div>:null}
                    <dt>Email</dt>
                    <dd><input className="form-control" onBlur={signInForm.handleBlur} onChange={handleCustomChange} name="Email" type="email" /></dd>
                    {signInForm.errors.Email?<div className="text-danger">{signInForm.errors.Email}</div>:null}
                    <dt>Mobile</dt>
                    <dd><input className="form-control" onChange={signInForm.handleChange} name="Mobile" type="text" /></dd>
                    {signInForm.errors.Mobile?<div className="text-danger">{signInForm.errors.Mobile}</div>:null}
                </dl>
                <button className="btn btn-dark w-100">Register</button>
            </form>
        </div>
    )
}