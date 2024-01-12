import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function SignUp () {
  const[username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const register = async () =>{
    try {
      axios.post("/signup", {username, password})
      navigate("/Info")
      
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
    <div className='navbar'>
        <h1>
          Register 
        </h1>
        
    </div>
    <hr></hr>
    <div className='login'>
      <input value={username} type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
      <br/>
      <input value={password} type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
      <br />
      <button className='sign' onClick={register}><a className="a_signup">Sign Up</a></button>
    </div>
    </>
  )
}

export default SignUp