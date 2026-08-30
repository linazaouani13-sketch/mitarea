    const express = require('express')
    const app =express() 
    app.get('/health' ,(req,res)=>{
         res.send("get health route")}) 
    app.listen(3000, () => { console.log("server is on port 3000") })