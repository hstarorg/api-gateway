express = require('express')
router = express.Router()
moduleLoader = require('./../common/moduleLoader')

step1 = require('./../processModules/initRequest')
step2 = require('./../processModules/reverseProxy')

### GET users listing. ###
router.all('/*'
    moduleLoader.loadModule(step1.name, step1.action)
    moduleLoader.loadModule(step2.name, step2.action)
)


module.exports = router
