import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const SignUp=()=>{
    const [name,setName] =useState("");
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const navigate=useNavigate();

    const collectData= async ()=>{
        console.log(name,email,password);
        let result=await fetch('http://localhost:5000/register',{
            method:"post",
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result=await result.json();
        if(result){
            localStorage.setItem("user",JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/');
        }
    }

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    });
    return(
        <div>
            <h1>Register</h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/><br/>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/><br/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/><br/>
            <button type="button" onClick={collectData}>SignUp</button>
        </div>
    )
}

export default SignUp;