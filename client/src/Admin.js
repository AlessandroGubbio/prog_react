import React, { useState } from 'react'
import axios from 'axios';
import './Admin.css'



function Admin (){
  const [accounts, setAccounts] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')
  const [hide, setHide] = useState(false);


  const showAccounts = () =>{
    axios.get('/admin')
    .then(res =>{
      setAccounts(res.data)
      setHide(!hide)
    }).catch(err=>{   
      console.log(err)
    })
  }

  const create = () =>{
    try {
      axios.post("/signup", {username, password})
      setUsername('')
      setPassword('')
    } catch (error) {
      //TODO
      setError('This Account already exists');
      console.log(error)
    }
    
  }

  return (
    <>
    <div className='navbar'>
        <h1>
          Admin 
        </h1>

      </div>
      <hr></hr>
    <div className='login'>
      <div className='acc'>
      <button className='show_button' onClick={showAccounts}>Show all Accounts</button>
      {hide && accounts &&(
        <div className='users_div'>
          <ul className='users'>
            {accounts.map(accounts => (
            <li><span className='span_user'>Username: </span> {accounts.username} <span className='span_user'> Password: </span>{accounts.password}</li>            
              ))}
          </ul>
        </div>
        )}
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      
      <h2>Insert account information </h2>
      <div className='form_but'>
        <div className='input_crud'>
          <p style={{color: 'red'}}>{error}</p>
          <input value={username} type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
          <br/>
          <input value={password} type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className='buttons'>
          <button className='crud' onClick={create}>Create</button>
          <br/>
          <button className='crud'>Update</button>
          <br/>
          <button className='crud'>Delete</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Admin