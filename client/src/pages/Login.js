import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {userContext} from '../services/userContext';
import {login} from '../services/user';
import "./Login.css";

function Login() {
  // React States
  const [connect, setConnect] = useState(false);

  const [message, setMessage] = useState();
  const [state, setState] = useState({
    userName:"",
    password:""
  });
  let history= useNavigate();

const redirectToBook= () => {
  history('/');
}

const sendToServer = async () =>{
 if (state.userName.length&&state.password.length){
   
  try{
    const result = await login(state.userName,state.password);
   
   
    console.log('token',result.data.token); 
    localStorage.token= result.data.token;
    setConnect({connect:true});
    console.log('connect',connect);
     redirectToBook();
   }
   catch(error){
     setMessage(error.response.data.error);
   }
 } else {
    setMessage('please enter  userName and password');
 }
 
}
const handleChange = (e) => {
  //console.log('target',e.target);
  const { id, value } = e.target;
  setState(prevState => ({
      ...prevState,
      [id]: value
  }))
}
 
 
 

  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center login">
      <form>
      <div className="form-group text-left">
        <label>UserName</label>
        <input type="text" className="form-control" id="userName" value={state.userName} onChange={handleChange}/>
      </div>
      <div className="form-group text-left">
        <label>Password</label>
        <input type="text" className="form-control" id="password" value={state.password} onChange={handleChange}/>
      </div>
      <button type="button" className="btn btn-dark mb-2" onClick={sendToServer}>Login </button>
      </form>
      <div style={{color:"red"}}>{message}</div>
      </div>
      

  );
}

export default Login;