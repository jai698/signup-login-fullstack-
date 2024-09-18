const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "dev"
const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const users = [];

app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/index.html")
})

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })    

    res.json({
        message: "You are signed up"
    })

    console.log(users)
    
})

app.post("/signin", function(req, res) {
    
    const username = req.body.username;
    const password = req.body.password;

    // maps and filter
    let foundUser = null;

    for (let i = 0; i<users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            foundUser = users[i]
        }
    }

    if (foundUser) {
        const token = jwt.sign({
            username: username,
            password: password,
        }, JWT_SECRET) ;

        // foundUser.token = token;
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    console.log(users)
})


function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData.username) {
      // req = {status, headers...., username, password, userFirstName, random; ":123123"}
      req.username = decodedData.username
      next()
  } else {
      res.json({
          message: "You are not logged in"
      })
  }
}

app.get("/me", auth, function(req, res) {
  // req = {status, headers...., username, password, userFirstName, random; ":123123"}
  const currentUser = req.username;
  // const token = req.headers.token;
  // const decodedData = jwt.verify(token, JWT_SECRET);
  // const currentUser = decodedData.username

  for (let i = 0; i < users.length; i++) {
      if (users[i].username === currentUser) {
          foundUser = users[i]
      }
  }

  res.json({
      username: foundUser.username,
      password: foundUser.password
  })
})

app.listen(3001);