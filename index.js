const express = require("express")
const app = express()
const port = 8001
const urlRoute = require("./routes/url")
const URL = require("./modals/url")
const { connectToMongoDB } = require("./connect")
connectToMongoDB("mongodb://127.0.0.1:27017/short-url", () => {
  console.log("connected successfully")
})
app.use(express.json())
app.use("/url", urlRoute)
app.use("/:shortId", async (req, res) => {
  const shortId = req.params.shortId
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: Date.now() } }
  )
  res.redirect(entry.redirectURL)
})

app.listen(port, () => {
  console.log("server started")
})
