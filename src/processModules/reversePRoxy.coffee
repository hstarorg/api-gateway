request = require('request')

exports.name = 'Reverse Proxy'

exports.action = (req, res, callback) ->
  console.log(exports.name )
  options = {
    method: req.method.toLowerCase()
    headers: req.headers
    uri: 'http://localhost:3001/api/get'
    timeout: 3*60*1000
  }
  resData = []
  resLength = 0

  # 调用
  proxyRequest = request(options)
  if options.method is 'post' or options.method is 'put'
    req.pipe(proxyRequest)
    # 接收请求数据
    req.on('data', (chunk) ->
      if !req.gateway.request.requestData
        req.gateway.request.requestData = chunk
      else
        req.gateway.request.requestData += chunk
    )
  proxyRequest.pipe(res)
  # 处理错误
  proxyRequest.on('error', (err) ->
    console.log(err)
  )
  # 代理请求接收数据
  proxyRequest.on('data', (data) ->
    resData.push(data)
    resLength += data.length
  )
  # 处理响应头
  proxyRequest.on('response', (response) ->
    req.gateway.request.responseHeader = response.headers
    req.gateway.request.statusCode = response.statusCode
  )
  # 代理请求结束
  proxyRequest.on('end', ->
    req.gateway.request.responseDate = new Date()
    req.gateway.request.responseData = Buffer.concat(resData, resLength) if resData.length > 0
  )