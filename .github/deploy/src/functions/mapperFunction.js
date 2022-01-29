function handler (event) {
  const request = event.request
  const uri = request.uri

  if (uri.endsWith('/')) {
    request.uri += 'index.html'
  } else if (!uri.includes('.')) {
    request.uri += '.html'
  }

  return request
}
