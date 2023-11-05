// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object

// we will put some server logic here later...

app.get("/home", (req, res) => {
    res.send("please send help [crying_face]")
  })

// export the express app we created to make it available to other modules
module.exports = app
