import Signup  from "./components/signup/signup"
import Login from "./components/login/login";
import {BrowserRouter,Routes,Route} from "react-router-dom"

const  App=()=> {
  return (
    <>
     Client server is UP;
     <BrowserRouter>
       <Routes>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
       </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
