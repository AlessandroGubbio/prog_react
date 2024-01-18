const express = require('express');
const bobyParser = require('body-parser')
const cors = require('cors')
const os = require('os');
const client = require('./database')
const fs = require('fs');
const path = require('path');

const {exec} = require("child_process");


const app = express();
app.use(cors())
app.use(bobyParser.urlencoded({extended: false}))
app.use(bobyParser.json())





app.get('/disk', (req, res) => {
  exec('wmic logicaldisk get size,freespace', (error, stdout)=>{
    const disk = stdout
    const diskInfo = disk.trim().split('\n')[1].split('  ')
    const free = ((diskInfo[1]-diskInfo[0])/(1024*1024*1204)).toFixed(2);
    const tot = (diskInfo[1]/(1024*1024*1024)).toFixed(2);
    res.json({"use": free, "tot": tot})
  })
})

app.get("/cpu", (req, res)=>{
  const numberCpus = os.availableParallelism()

  const cpus = os.cpus()
  let total = 0;
  for(const cpu of cpus){
    total += cpu.speed
  }
  const totalCpu = (total/1024).toFixed(2) //GHz
  const useCpu = os.loadavg()[0] //returns 0 on Windows

  res.json({"numberCpu": numberCpus, "totCpus": totalCpu, "cpuUsage": useCpu})
});

app.get("/ram", (req, res)=>{
  const totalRam = (os.totalmem()/1073741824).toFixed(2) //Gb
  const useRam = ((os.totalmem() - os.freemem())/1073741824).toFixed(2) //Gb

  res.json({"totalRam": totalRam, "useRam": useRam})
});


app.post("/readFile", (req, res)=>{
  const file = req.body.fileName;
  //const paths = 'C:/Users/Studente1.1/Downloads/tmp/';
  const paths = "C:\Users\agubb\Downloads"
  const filepath = paths+file+'.txt';
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.json("file not found")
    } else {
      res.send(data)
  }})
});

app.post("/readDir", (req, res)=>{
  const dir = req.body.dirName;
  //const path = 'C:/Users/antog/Downloads/';
  //const dirPath = path+dir;

  let text = []
  fs.readdir(dir, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.json("directory not found")
    } else {
      console.log(data);
      //TODO DA ELABORARE {"nomefile": "file|dir", "prova.txt": "file"}
      for (let i in data) {
        if (path.extname(data[i])) {
            text.push(
                'file : ' + data[i] 
            );
        } else {
            text.push(
                'folder : '+ data[i] 
            )
        }
    }
    console.log(text)
    res.json(text);
  }})
});




app.get('/admin', (req, res) =>{
  const query = client.query("SELECT * FROM users");
  query.then(result => {
    res.json(result.rows);
  }).catch(error => {
    console.error(error);
    res.status(500).send('Error executing query');
  });
});






app.post('/Login', async (req, res) => {
  try {
      const {username, password} = req.body;

      const validateUser = client.query("SELECT username, password FROM users WHERE username = $1 AND password = $2", [username, password]);
      if ((await validateUser).rows.length > 0) {
          res.json({ success: true, message: 'Login successful' });
      } else {
          res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/signup', async (req, res) => {
  try {
      const {username, password} = req.body;

      client.query("INSERT INTO users (username, password) VALUES($1, $2)", [username, password]);
  } catch (error) {
      console.error('Error during sign up:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/modify', async (req, res)=>{
  try {
    const {username, password, user, pass} = req.body;

    const validateUser = await client.query("UPDATE users SET username=$1, password=$2 WHERE username=$3 AND password=$4" 
    , [username, password, user, pass]);
    
    //on the update the rows will be 0 so the check should be done on rowCount 
    if(validateUser.rowCount > 0){
      res.json({ success: true, message: 'Modification successful' });
    }else{
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error modifying info:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.post('/update', async (req,res)=>{
  try {
    const {username, password, n_user, n_pass} = req.body;
    const validateUser = await client.query("UPDATE users SET username=$1, password=$2 WHERE username=$3 AND password=$4" 
    , [n_user, n_pass, username, password]);
    if(validateUser.rowCount > 0){
      res.json({ success: true, message: 'Modification successful' });
    }else{
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error modifying info:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.post('/delete', async (req, res)=>{
  try {
    const {user} = req.body;
    client.query("DELETE FROM users WHERE username = $1", [user])
  } catch (error) {
    console.error('Error deleting user:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.post('/deleteU', async (req, res)=>{
  try {
    const {username} = req.body;
    client.query("DELETE FROM users WHERE username = $1", [username])
  } catch (error) {
    console.error('Error deleting user:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})




const port = 5000;
app.listen(port, function(err){
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});
