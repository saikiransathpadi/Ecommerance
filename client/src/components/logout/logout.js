import {useNavigate} from "react-router-dom"

const Logout =()=>{
    const navigate = useNavigate();
    const handlelogout =()=>{
        localStorage.setItem("authTokenr","")
        navigate("/");
    }
    return (
        <>
         <button onClick={handlelogout}>Logout</button>
        </>

    )
}

export default Logout;