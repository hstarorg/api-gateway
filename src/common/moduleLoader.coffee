module.exports ={
  loadModule: (stepName, action) ->
    (req , res, next) ->
      action(req, res, (result) ->
        res.write(stepName)
        next()
      )
}