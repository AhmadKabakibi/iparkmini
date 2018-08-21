module.exports = {
  success (res, result) {
    return res.json({ data: result })
  }
}
