const express = require('express')
const bodyParser = require('body-parser')
const admin = require('firebase-admin')
const serviceAccount = require('./service-account-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fir-sign-in-fc332.firebaseio.com'
})

const host = 'localhost'
const port = 5001

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
  const { idToken } = req.body

  // idToken comes from the client app
  const decodedToken = await admin.auth().verifyIdToken(idToken)
    .catch((err) => console.log(err))
  
  console.log(decodedToken)

  res.send('OK')
})

app.listen(port, host, () => {
  console.log('listening at http://%s:%s', host, port)
})
