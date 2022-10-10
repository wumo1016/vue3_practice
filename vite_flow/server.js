// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
const app = express()

app.post('/login', function (req, res) {
  res.send({
    code: 0,
    data: { username: 'zf', token: 'server token' }
  })
})

app.listen(3000)
