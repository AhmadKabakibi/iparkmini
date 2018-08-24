module.exports = {
  csvLoader: require('./parser').csvLoader(process.argv[2])
}
