import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Modify () {
  const[username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const navigate = useNavigate()

  const modify = async () =>{
    try {
      axios.post("/modify", {username, password, user, pass})
      navigate("/Info")
      
    } catch (err) {
      console.log(err)
    }
  }

  const deleteU = () =>{
    try {
      axios.post("/delete", {username, password})
      navigate("/Login")
      
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <>
    <div className='navbar'>
        <h1>
          Modify Account information 
        </h1>
        
    </div>
    <hr></hr>
    <div className='login'>
      <input value={user} type='text' placeholder='Previous Username' onChange={(e) => setUser(e.target.value)}></input>
      <br/>
      <input value={pass} type='text' placeholder='Previous Password' onChange={(e) => setPass(e.target.value)}></input>
      <br/>
      <br/>
      <input value={username} type='text' placeholder='New Username' onChange={(e) => setUsername(e.target.value)}></input>
      <br/>
      <input value={password} type='text' placeholder='New Password' onChange={(e) => setPassword(e.target.value)}></input>
      <br />
      <button className='sign' onClick={modify}><a className="a_signup">Modify</a></button>
      <br />
      <button className='sign' onClick={deleteU}><a className="a_signup">Delete</a></button>
    </div>
    </>
  )
  }
export default Modify