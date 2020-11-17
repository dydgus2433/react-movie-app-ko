
const config = require('./config/key')
const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}))

//application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/user',require('./routes/users'))
app.use('/api/favorite',require('./routes/favorite'))

const mongoose = require('mongoose')
mongoose.connect( config.mongodbURI,
{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB ConnectDB..'))
.catch((err)=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 에~!!')
})

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})