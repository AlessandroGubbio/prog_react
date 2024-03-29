import React, { useState } from 'react'
import axios from 'axios';
import './Admin.css'



function Admin (){
  const [accounts, setAccounts] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [n_user, setN_user] = useState("");
  const [n_pass, setN_pass] = useState("");


  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')


  const [hide, setHide] = useState(false);
  const [hideU, setHideU] = useState(false);


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

  const modify = async () =>{
    setHideU(!hideU)
  }

  const update = async ()=>{
    try {
      await axios.post("/update", {username, password, n_user, n_pass}).then(
      setUsername(''),
      setPassword(''),
      setN_pass(''),
      setN_user(''),
      setSuccess('Update successful')
      )
    } catch (error) {
      setError('Invalid email or password. Modification unsuccesfull');
      console.log(error);
    }
    
  }
  

  const deleteU = () =>{
    try {
      axios.post("/deleteU", {username}).then(
        setUsername(''),
        setPassword(''),
        setSuccess('The User has been Successfully Deleted')
      ).catch(err =>{
        setError('Error deleting account')
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
      <button className='btn_info' onClick={showAccounts}>Show all Users</button>
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
        <p style={{color: 'red'}}>{error}</p>
        <p style={{color: 'rgb(0, 239, 68)'}}>{success}</p>
        <div className='flexx'>
          <div className='input_crud'>
            <input className='i_crud' value={username} type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
            <br/>
            <input className='i_crud' value={password} type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            {hideU &&(
            <div className='new_info'>
              <input className='i_crud'placeholder='New Username' value={n_user} onChange={(e) => setN_user(e.target.value)}></input>
              <br></br>
              <input className='i_crud' placeholder='New Password'value={n_pass} onChange={(e) => setN_pass(e.target.value)}></input>
              <button className='up_btn'onClick={update}>Submit</button>
            </div>
            )}
        </div>
        <div className='buttons'>
          <button className='crud_c' onClick={create}>Create</button>
          
          <button className='crud_u' onClick={modify}>Update</button>
          
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