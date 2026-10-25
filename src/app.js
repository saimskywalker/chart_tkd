const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello there!')
})

app.use('/tkd', require('./tkd/tkd.controller'))
app.use('/alokasi', require('./AlokasiTKD/alokasi.controller'))
app.use('/admin', require('./adminlogin/admin.controller'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App listening on port ` + PORT)
})
