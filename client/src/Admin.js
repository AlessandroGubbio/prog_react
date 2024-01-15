import React, { useState } from 'react'
import axios from 'axios';
import './Admin.css'



function Admin (){
  const [accounts, setAccounts] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
      axios.post("/signup", {username, password}).then(
        setUsername(''),
        setPassword(''),
        setSuccess('User successfully Created')
      )
      .catch(err => {
        setError('Username not available. Please try a different one')
        console.log(err);
      });
    } catch (error) {
      setError('This Account already exists');
      console.log(error)
    } 
  }

  const modify = () =>{
    
  }

  const deleteU = () =>{
    try {
      axios.post("/deleteU", {username}).then(
        setUsername(''),
        setPassword(''),
        setSuccess('The User has been Successfully Deleted')
      ).catch(err =>{
        setError('')
        console.log(err)
      })
    } catch (err) {
      console.log(err)
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
      <button className='show_button' onClick={showAccounts}>Show all Users</button>
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
      
      <h2>Account information </h2>
      <hr className='hr_s'></hr>
      
      <div className='form_but'>
        <div><span className='nn'>Create and Update:</span> Insert username and password</div>
        <br/>
        <div><span className='nn'>Delete:</span> Insert username</div>
        <div className='input_crud'>
          <p style={{color: 'red'}}>{error}</p>
          <p style={{color: 'rgb(0, 239, 68)'}}>{success}</p>
          <input className='i_crud' value={username} type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
          <br/>
          <input className='i_crud' value={password} type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className='buttons'>
          <button className='crud_c' onClick={create}>Create</button>
          
          <button className='crud_u'>Update</button>
          
          <button className='crud_d' onClick={deleteU}>Delete</button>
          
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <br/> 
    <br/> 
    <br/> 
    <br/> 
    </>
  )
}

export default Admin