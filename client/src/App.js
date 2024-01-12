import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
//import { useNavigate } from "react-router-dom";
import Login from './Login';
import Info from './Info';
import SignUp from './SignUp';
import Modify from './Modify';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/Login" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path='/Info' element={<Info />}></Route>
        <Route path='/Modify' element={<Modify />}></Route>
        <Route path="/" element={<Navigate to ="Login"/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App