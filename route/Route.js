const express = require("express")
const fs = require('fs');
const  Blog  = require('./../BlogsData/blogs.js');

const dataPath = './BlogsData/blog.json'
const router = express.Router();

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}

//Read

router.get('/blog/list', (req, res) => {
    const blogaccounts = getAccountData()
    res.send(blogaccounts)
  })

  //Read By Id
  router.get('/blog/:id',(req ,res) =>{
    const blogs= getAccountData();
    const objectWithDesireId = blogs[req.params['id']];
    res.send(objectWithDesireId);
  }) 

  //post
router.post('/blog/addblog', (req, res) => {
 
  var existblogs = getAccountData()
  const newAccountId = Math.floor(100000 + Math.random() * 900000)

  let obj = new Blog();
  obj.title = req.body.title;
  obj.content = req.body.content;
  obj.author = req.body.author;
  obj.timestamp = new Date();

  existblogs[newAccountId] = obj
  saveAccountData(existblogs);
  res.send({success: true, msg: 'Blog added successfully'})
})

  //update
  router.put('/blog/:id', (req, res) => {
    var existAccounts = getAccountData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
      const accountId = req.params['id'];

      let obj = new Blog();
    obj.title = req.body.title;
    obj.content = req.body.content;
    obj.author = req.body.author;
    obj.timestamp = new Date();

      existAccounts[accountId] = obj;
      saveAccountData(existAccounts);
      res.send(`Blog with id ${accountId} has been updated`)
    }, true);
  });

  //Delete
  router.delete('/blog/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existAccounts = getAccountData()
      const userId = req.params['id'];
      delete existAccounts[userId]; 
      saveAccountData(existAccounts);
      res.send(`Blog with id ${userId} has been deleted`)
    }, true);
  })

  

module.exports = router;