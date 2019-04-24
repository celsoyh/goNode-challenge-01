const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoscape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const checkIfHasAge = (req, res, next) => {
  const ageVal = req.body.age

  if (!ageVal) return res.redirect(301, '/')

  return next()
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', checkIfHasAge, (req, res) => {
  return req.body.age >= 18
    ? res.redirect(`/major?age=${req.body.age}`)
    : res.redirect(`/minor?age=${req.body.age}`)
})

app.get('/major', (req, res) => {
  return res.render('ageview', { ageRule: 'maior', age: req.query.age })
})

app.get('/minor', (req, res) => {
  return res.render('ageview', { ageRule: 'menor', age: req.query.age })
})

app.listen('3000')
