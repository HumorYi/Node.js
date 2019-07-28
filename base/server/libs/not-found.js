module.exports = (res) => {
  res.writeHeader(404)
  res.write('Not Found')
  res.end()
}