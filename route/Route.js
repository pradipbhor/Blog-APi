const express = require("express")
const router = express.Router();
const fs = require('fs');
const blogRoutes = require('./Blogs.js');
const  Blog  = require('./../BlogsData/blogs.js');
router.use(blogRoutes);
const dataPath = './BlogsData/blog.json'

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}

//post
blogRoutes.post('/blog/addblog', (req, res) => {
 
    var existblogs = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
  
    let obj = new Blog();
    obj.title = req.body.title;
    obj.content = req.body.content;
    obj.author = req.body.author;
    obj.timestamp = new Date();


    existblogs[newAccountId] = obj
    console.log(existblogs);
    saveAccountData(existblogs);
    res.send({success: true, msg: 'Blog added successfully'})
})

//Read

blogRoutes.get('/blog/list', (req, res) => {
    const blogaccounts = getAccountData()
    res.send(blogaccounts)
  })

  //update
  blogRoutes.put('/blog/:id', (req, res) => {
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
  blogRoutes.delete('/blog/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existAccounts = getAccountData()
      const userId = req.params['id'];
      delete existAccounts[userId]; 
      saveAccountData(existAccounts);
      res.send(`Blog with id ${userId} has been deleted`)
    }, true);
  })

  //Read By Id
  blogRoutes.get('/blog/:id',(req ,res) =>{
    const blogs= getAccountData();
    const objectWithDesireId = blogs[req.params['id']];
    res.send(objectWithDesireId);
  })

module.exports = router;