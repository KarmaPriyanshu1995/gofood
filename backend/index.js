const express = require('express')
const app = express()
const port = 5000
const Category = require ("./models/itemcategory.model")
const foodItem = require("./foodData2")
const mongoDB =require('./db')
mongoDB()



app.get('/category-add', async (req, res) => {
for(let i=0; i< foodItem.data.length;i++) {
  await Category.create(foodItem.data[i])
}
  res.send('Category add Successfully!')
})
app.get('/category', async (req, res) => {
  const allCategory = await Category.find({});
  res.json({
    msg: "All Category",
    data: allCategory
  })
})
app.use(express.json())
app.use('/api',require("./CreateUser"))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})