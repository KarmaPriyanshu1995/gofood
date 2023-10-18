const express = require("express");
const app = express();
const port = 5000;
const Category = require("./models/itemcategory.model");
const FoodCategory = require("./models/foodcategory.model");
const foodItem = require("./foodData2");
const foodCatalog = require("./foodCategory");
const Order = require("./models/order.model");
const mongoDB = require("./db");
const cors = require("cors");
mongoDB();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", require("./CreateUser"));

// app.use((req, res, next) =>  {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get("/category-add", async (req, res) => {
  for (let i = 0; i < foodItem.data.length; i++) {
    await Category.create(foodItem.data[i]);
  }
  res.send("Category add Successfully!");
});
app.get("/category", async (req, res) => {
  const allCategory = await Category.find({});
  res.json({
    msg: "All Category",
    data: allCategory,
  });
});
app.get("/foodcategory-add", async (req, res) => {
  for (let i = 0; i < foodCatalog.foodCategory.length; i++) {
    await FoodCategory.create(foodCatalog.foodCategory[i]);
  }
  res.send("Category add Successfully!");
});
app.get("/foodcategory", async (req, res) => {
  const allCategory = await FoodCategory.find({});
  res.json({
    msg: "All Category",
    data: allCategory,
  });
});
app.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  // await data.splice(0,0,{Order_date:req.body.order_date})

  let eId = await Order.findOne({ email: req.body.email });
  console.log("eId", eId);
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: data,
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log("error", error.message);
      res.send("server error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      res.send("server error", error.message);
    }
  }
});

app.post("/myorderdata",async(req,res)=>{
  try{
let myData = await Order.findOne({'email':req.body.email})
res.json({orderData:myData})
  }catch (error){
res.send("Server Error",error.message)
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
