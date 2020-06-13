const express = require('express')
const pkg = require('./package.json')

const app = express()

app.get('*', (_, res) => res.send('Hello World!'))

app.listen(
  process.env.PORT || 3000,
  process.env.HOST,
  err => {
    if (err) return console.error(err)
    console.log(`running ${pkg.name} at http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`)
  }
)
