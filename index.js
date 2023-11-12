//import express
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoutes')
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static("./styles"));


//defining template engine
app.engine('perscholas', (filepath, options, callback)=>{
    fs.readFile(filepath,(err,content)=>{
        if (err) return callback(err);

        const rendered = content
        .toString()
        .replaceAll("#title#", `${options.title}`)
        .replace("#content#", `${options.content}`);
      return callback(null, rendered);
    })
})
app.set("views", "./views"); // specify the views directory
app.set("view engine", "perscholas"); // register the template engine



//MIDDLEWARE
const logReq = (req, res, next) => {
  console.log("Request received");
  next();
};
const validateCookies = async (req, res, next) => {
  await cookieValidator(req.cookies);
  next();
};
const cookieValidator = async (cookies) => {
  console.log(cookies);

  return true;
};
//error handling middleware
app.use((err, req, res, next)=>{
    res.status(500).send(err.message)
})

app.use(logReq);
app.use(cookieParser())
app.use(validateCookies)


//ROUTES
//home route
app.get('/', (req, res)=>{
    // res.send('HOME') //for template engine
    const options = {
        title: "Rendering Views with Express",
        content:
          "Here, we've created a basic template engine using <code>app.engine()</code> \
          and the <code>fs</code> module, then used <code>res.render</code> to \
          render this page using custom content within the template.<br><br> \
          Generally, you won't want to create your own view engines, \
          but it important to understand how they work behind the scenes. \
          For a look at some popular view engines, check out the documentation for \
          <a href='https://pugjs.org/api/getting-started.html'>Pug</a>, \
          <a href='https://www.npmjs.com/package/mustache'>Mustache</a>, or \
          <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
          More complete front-end libraries like React, Angular, and Vue \
          also have Express integrations.",
      };
    
      res.render("index", options);
    });


    

app.use("/user", userRoutes)

//LISTEN
app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});






// // import express
// const express = require('express')
// const app = express();
// const port = 3000;




// //Middleware
// const logReq = function (req, res, next) {
//     console.log("Request Received");
//     next();
//   };
  
//   app.use(logReq);
  
// //   app.get("/", (req, res) => {
// //     res.send("Keeping it simple.");
// //   });
  



// //Routes
// app.get('/', (req, res)=>{ //always req and res
// res.send('hello express')
// })

// app.listen(port, ()=>{
//     console.log(`server listening on port:${port}`)
// })


// // app.post('/user', (req,res)=>{
// //     res.send({
// //         userName:'bob',
// //         desc: ''
// //     })
// // })


// app.get('/express', (req, res)=>{
// res.send('i just created another route')
// })

// app.get("/", (req, res) => {
//     res.send("Try navigating to /user.");
//   });
  
//   app.get("/user", (req, res) => {
//     res.send(`Received a GET request for user!
//   Try navigating to /user/somevalue/profile/somevalue.`);
//   });
  
//   app.get("/user/:userID", (req, res) => {
//     res.send(`Navigated to the user page for: ${req.params.userID}.`);
//   });
  
//   app.get("/user/:userID/profile", (req, res) => {
//     res.send(`Navigated to the user profile page for: ${req.params.userID}.`);
//   });
  
//   app.get("/user/:userID/profile/:data", (req, res) => {
//     res.send(
//       `Navigated to the user profile page for: ${req.params.userID}, with the data: ${req.params.data}.`
//     );
//   });
  
  



