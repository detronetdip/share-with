const mongoose=require('mongoose');
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('connected...');
}).catch(e=>{
    console.log('Something went wrong');
})
module.exports=mongoose;