import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import "./App.css"


function Info () {
  const [beData, setBeData] = useState()
  const [beRam, setBeRam] = useState()
  const [beDisk, setBeDisk] = useState()
  const [beFile, setBeFile] = useState()
  const [beDir, setBeDir] = useState()

  const [hide, setHide] = useState(false) // initially the info is not shown ( only after the button press)
  const [hideRam, setHideRam] = useState(false)
  const [hideDisk, setHideDisk] = useState(false)
  const [hideFile, setHideFile] = useState(false)
  const [hideDir, setHideDir] = useState(false)

  const [fileName, setfileName] = useState("")
  const [dirName, setdirName] = useState("")

const cpuInfo =()=>{
  axios.get("/cpu") // call to the backend api where the info is stored
  .then(res =>{     // if the callback is succesfull (res.data to get the json received from the backend)
    setBeData(res.data)
    setHide(!hide)  // set the useState to true so that the info gets shown
    console.log(res.data)
  }).catch(err=>{   // if there's an error in the callback
    console.log(err)
  })
}

const diskInfo = () =>{
  axios.get("/disk")
  .then(res =>{
    setBeDisk(res.data);
    setHideDisk(!hideDisk)
    console.log(res.data)
  }).catch(err=>{   // if there's an error in the callback
    console.log(err)
  })
}

const ramInfo = () =>{
  axios.get('/ram')
  .then(res =>{
    setBeRam(res.data);
    setHideRam(!hideRam)
    console.log(res.data)
  }).catch(err=>{   
    console.log(err)
  })
}
const readFile = ()=>{
  axios.post('/readFile', {fileName})
  .then(res =>{
    setBeFile(res.data)
    setHideFile(!hideFile)
  }).catch(err=>{   
    console.log(err)
  })
}
const readDir = ()=>{
  console.log("1")
  axios.post('/readDir', {dirName})
  .then(res =>{
    setBeDir(res.data)
    setHideDir(!hideDir)
  }).catch(err=>{   
    console.log(err)
  })
}


  return (
    <>
      <div className='navbar'>
        <h1 className='nav_title'>
          Sistem Info 
        </h1>
        <div className='nav_a'><a href='/Modify'>Modify Account</a></div>
      </div>
      <hr></hr>
      <div className='button_div'>
        <div>
          - Click here to get the CPU info of the server
        </div>
        <br></br>
        <button onClick={cpuInfo}>Cpu information</button>
        
        {hide && beData && ( //check if the info needs to be shown
        <div className='cpu_box'>
          <div className='cpu_info'>
            <p>Number of Cpus available: {beData.numberCpu}</p>
            <p>Total Cpu: {beData.totCpus} Gh</p>
            <p>Cpu Usage (0 on Windows): {beData.cpuUsage}</p>
          </div>
        </div>
        )
      }
      </div>
      
      <div className='button_div'>
        <div>
          - Click here to get the RAM info 
        </div>
        <br></br>
        <button onClick={ramInfo}>Ram information</button>
        {hideRam && beRam && ( //check if the info needs to be shown
        <div className='ram_box'>
          <div className='ram_info'>
            <p>Total Ram: {beRam.totalRam} Gb</p>
            <p>Ram usage: {beRam.useRam} Gb</p>    
          </div>
        </div>
        )}
      </div>
      
      <div className='button_div'>
        <div>
          - Click here to get the Disk info 
        </div>
        <br></br>
        <button onClick={diskInfo}>Disk information</button>
        
        {hideDisk && beDisk && ( //check if the info needs to be shown
        <div className='disk_box'>
          <div className='disk_info'>
            <p>Total Disk space: {(beDisk.tot)} Gb</p>
            <p>Disk usage: {beDisk.use} Gb</p>
          </div>
        </div>
        )
      }
      </div>
      
      <div className='button_div'>
        <div>
          - Type the name of a File you'd like to know the contents of (text files) 
        </div>
        <br></br>
        <div className='file_div'>
        <input className='file' type="text" placeholder='File name' value={fileName} onChange={(e)=>setfileName(e.target.value)}></input>
        <button onClick={readFile}>submit file</button>
        </div>
        {hideFile && beFile && ( 
        <div className='file_box'>
          <div className='file_info'>
            {fileName}: {beFile} 
          </div>
        </div>
        )
      }
      </div>
      
      <div className='button_div'>
        <div>
          - Type the name of a Directory you'd like to know the contents of
        </div>
        <br></br>
        <div className='dir_div'>
        <input className='dir' type="text" placeholder='Directory name' value={dirName} onChange={(e)=>setdirName(e.target.value)}></input>
        <button onClick={readDir}>submit directory</button>
        </div>
        {hideDir && beDir && ( 
        <div className='dir_box'>
          <div className='dir_info'>
            {dirName}: 
            <ul>
              {beDir && beDir.map((info, index)=>(
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        </div>
        )
      }
      </div>
    </>
  
  )
}

export default Info