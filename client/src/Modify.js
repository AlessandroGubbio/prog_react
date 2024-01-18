import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Modify () {
  const[username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const modify = async () =>{
    try {
      await axios.post("/modify", {username, password, user, pass});
      navigate("/Info");
      
    } catch (error) {
      setError('Invalid email or password. Modification unsuccesful');
      console.log(error);
    }
  }

  const deleteU = () =>{
    try {
      axios.post("/delete", {user});
      navigate("/SignUp");
      
    } catch (err) {
      console.log(err);
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
    <p className='p_m'>to update the user information fill all fields, to delete the account it is possible to only fill the username</p>
    <div className='login'>
      <p style={{color: 'red'}}>{error}</p>
      <p>Prevoius Account information </p>
      <hr className='hr_s'></hr>
      <input className='input_mod' value={user} type='text' placeholder='Previous Username' onChange={(e) => setUser(e.target.value)}></input>
      <br/>
      <input  className='input_mod'value={pass} type='text' placeholder='Previous Password' onChange={(e) => setPass(e.target.value)}></input>
      <br/>
      <br/>
      <p>New Account information</p>
      <hr className='hr_s'></hr>
      <input className='input_mod' value={username} type='text' placeholder='New Username' onChange={(e) => setUsername(e.target.value)}></input>
      <br/>
      <input className='input_mod' value={password} type='text' placeholder='New Password' onChange={(e) => setPassword(e.target.value)}></input>
      <br />
      <br />
      <button className='update_b' onClick={modify}>Update</button>
      <br />
      <button className='delete_b' onClick={deleteU}>Delete</button>
    </div>
    </>
  )
  }
export default Modify