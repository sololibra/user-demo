const mongoose = require("mongoose")
const url = process.env.DB_BASE_URL
const dbName = process.env.DB_NAME
//mongoose.set('useFindAndModify', false)
mongoose.connect(`${url}/${dbName}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.on('open',()=>{
    console.log('MongoDb connection succeeded')
})
module.exports = mongoose