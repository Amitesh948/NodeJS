const http = require("http");
const fs = require("fs");

const express = require("express")

const app= express();

app.get('/', (req , res)=>{
    return res.send("Hello From Home Page")
})

app.get('/about', (req , res)=>{
    return res.send("Hello From About Page")
})

// const myServer= http.createServer(app => {
//     const log = `${Date.now()}: ${req.url} New request received\n`
//     fs.appendFile('log.txt', log ,(err, data) => {
//         switch(req.url){
//             case "/" : res.end("Home Page")
//             break;
//             case "/about" : res.end("About Page")
//             break;
//             default : res.end("404 NOT FOUND")  
//         }
//     }) 
// });
//const myServer = http.createServer(app);
app.listen(3000, () => {
    console.log('Server Started!');
});