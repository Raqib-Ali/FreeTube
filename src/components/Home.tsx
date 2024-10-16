import axios from "axios";
import { useEffect, useState } from "react";
import { UserContract } from "../contracts/user-contract";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import './Home.css';

export function Home(){

const [input, setInput] = useState<string>();
const cookie = useCookies(['email']);
const [button, setButton] = useState(false);
const navigate = useNavigate();

    function handleInput(e: any){
       setInput(e.target.value);
       setButton(false);
    }

    function registerUser(e:any){
      e.preventDefault();
      axios.get('http://127.0.0.1:2200/get-users')
      .then(users =>{
        let userId = users.data.find((user:{id:string;
            UserId:number;
            Password:string;
            Email:string;
            Mobile:number;}) => user.Email === input)

            if(userId?.Email === input){
               cookie[1]('email', input);
               navigate('/dashboard');
            }else{
                setButton(true);
            }
      }) 
    }    



    return(
        <div style={{height:"92vh"}} className="background">
            <div className="shade d-flex justify-content-center align-items-center">
            <form className="form" onSubmit={registerUser}>
                <h1 className="text-light">Watch Free Content Anytime!</h1>
                <div className="input-group">
                <input required placeholder="example: john@xyx.com" className="form-control" onChange={handleInput} type="email" />
                <button className="btn btn-danger">Get Started</button>
                </div>
                <div className="mt-2 position-absolute">
                    {button?<Alert severity="warning">
                      Account not found
                    </Alert>:''}
                </div>
            </form>
            </div>
        </div>
    )
}