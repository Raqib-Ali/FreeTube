import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import './Home.css';

export function Home(){

const [input, setInput] = useState<string>();
const cookie = useCookies(['email']);
const [alert, setAlert] = useState(false);
const navigate = useNavigate();

    function handleInput(e: any){
       setInput(e.target.value);
       setAlert(false);
    }

    function registerUser(e:any){
      e.preventDefault();
      axios.get('http://127.0.0.1:2200/get-users')
      .then(users =>{
        let userId = users.data.find((user:any) => user.Email === input)

            if(userId?.Email === input){
               cookie[1]('email', input);
               navigate('/dashboard');
            }else{
                setAlert(true);
            }
      }) 
    }    



    return(
        <div style={{height:"91vh"}} className="background">
            <div className="shade d-flex justify-content-center align-items-center">
            <form className="form" onSubmit={registerUser}>
                <h1 className="text-dark">Watch Free Content Anytime!</h1>
                <div className="input-group shadow">
                <input required placeholder="example: john@xyx.com" className="form-control" onChange={handleInput} type="email" />
                <button className="btn btn-danger">Get Started</button>
                </div>
                <div className="mt-2 position-absolute">
                    {alert?<Alert severity="warning">
                      Account not found
                    </Alert>:''}
                </div>
            </form>
            </div>
        </div>
    )
}