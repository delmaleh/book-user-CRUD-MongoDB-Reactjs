import {useContext, useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './pages/Login';
import AppUser from "./AppUser";
import AppBook from "./AppBook";
import {checkToken} from './services/user';
import {userContext} from './services/userContext';


export default function Default(){
    const [connect, setConnect] = useState(false);
    
    useEffect(() => {
        async function checkConnection(){
          if(localStorage.token)
          {
            try{
            const result = await checkToken();
            
            if(result.status == 200)
            {
              
              setConnect(true);
              console.log("result",result)
            }
            }catch(error){
                console.log(error.response.data.error);
            }
          }
        
        }
        checkConnection();
      },[])

    return (
        <Router>
            <userContext.Provider value={{connect,setConnect}}>
            <Routes>
             
             {connect ? <Route path="/" element={ <AppBook/> }></Route>:<Route path="/" element={<Login />}></Route>}
             
            
             </Routes> 
            </userContext.Provider>
        </Router>
    )
}