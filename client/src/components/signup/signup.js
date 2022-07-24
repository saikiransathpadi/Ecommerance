import { useState } from "react";
import axios from "axios";
const  Signup=()=> {
  const [signupState,setsignupState] =useState({})
    const signupFormData =[{Attr:"username",type:"text",id:"username",label:"Username"},
                           {Attr:"phone_number",type:"text",id:"phone_number",label:"Mobile_Number"},
                           {Attr:"email_id",type:"text",id:"email_id",label:"Email"},
                           {Attr:"password",type:"password",id:"password",label:"Password"}]
    const handleUserAdd=()=>{
      axios({
        url:"http://localhost:3001/user/signup",
        method:"POST",
        headers:{

        },
        data: signupState
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }
    const handleInputChange =(e ,id)=>{
      if(id==="phone_number"){
        e.target.value = parseInt(e.target.value)
      }
      if(id==="email_id"){
        e.target.value = String(e.target.value)
      }
      setsignupState({...signupState ,[id]: e.target.value})
    }
    return (
      <>
        <form>
            {signupFormData.map((formkey)=>{
                return <div>
                <div>
                  <div>
                    <label for= {formkey.id} >{formkey.label}</label>
                  </div>
                  <div>
                    <input type={formkey.type} id={formkey.id} onChange={(e)=>{handleInputChange(e,formkey.id)}}/>
                  </div>
                </div>
                </div>
            })

            }
        </form>
        <button type="button" onClick={handleUserAdd}>Signup</button>
      </>
        
    );
  }

export default Signup;