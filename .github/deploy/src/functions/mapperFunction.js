exports.handler = async (event) => {
  const request = event.Records[0].cf.request
  const uri = request.uri

  if (uri.endsWith('/')) {
    request.uri += 'index.html'
  } else if (!uri.includes('.')) {
    request.uri += '.html'
  }

  return request
}
