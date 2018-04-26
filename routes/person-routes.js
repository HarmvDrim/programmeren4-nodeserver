//  
// Person routes
//

const express = require('express')
const PersonController = require('../controllers/person-controller')
let routes = express.Router()

routes.get('/person', PersonController.getAllPersons)

routes.get('/person/:id', PersonController.getPersonById)

routes.post('/person', PersonController.createPerson)

routes.delete('/person/:id', PersonController.deletePersonById)

module.exports = routes