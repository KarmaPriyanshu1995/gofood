const mongoose = require('mongoose')


const mongoDB = async() => {
    mongoose.connect('mongodb://localhost:27017/gofood', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log("mongo db connect"))
    .catch(err => console.log(err,"mongodb error"))
    // const fetch_data = await mongoose.connection.db.collection("foodCategory");
    // fetch_data.find({}).toArray(function(err,data){
    //     if(err)console.log(err)
    //     else console.log(data)
    // }).catch(err)

    
}

module.exports = mongoDB;