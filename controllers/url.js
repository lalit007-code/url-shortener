const shortid = require("shortid")
const URL = require("../modals/url")

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body
  const shortId = shortid(8)

  if (!body.url)
    return res.status(400).json({
      message: "url is required",
    })

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitedHistory: [],
  })

  return res.json({ id: shortId })
}

module.exports = { handleGenerateNewShortUrl }
