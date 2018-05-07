//
// server.js
//
const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const person_routes = require('./routes/person-routes')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyparser.json())



app.use('*', (req, res, next) => {
	let httpmethod = req.method
	let requesturl = req.baseUrl
	console.log('We received a ' + httpmethod + ' request on url ' + requesturl)
	next()
})

app.use('/api', person_routes)

// Wanneer de gevraagde endpoint niet gevonden is komen we hier.
app.use('*', (req, res, next) => {
	let httpmethod = req.method
	let requesturl = req.baseUrl
	console.log('We received a ' + httpmethod + ' request on url ' + requesturl)

	next('Endpoint does not exist')
})

// Als er een next(info) werd aangeroepen komen we hier
app.use((err, req, res, next) => {
	console.log('Final error handler: an error occurred')
	console.log(err.toString())

	let requesturl = req.baseUrl

	const error = {
		error: err.toString(),
		url: requesturl
	}

	res.status(500).json(error).end()
})

app.listen(port, () => {
	console.log('Server is running on port ' + port)
})
