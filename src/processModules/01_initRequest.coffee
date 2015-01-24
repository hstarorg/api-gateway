
exports.name = 'Init'

exports.action = (req, res, callback) ->
  req.gateway ={}
  req.gateway.request = {
    requestDate: new Date()
    requestHeader: req.headers
  }
  callback()