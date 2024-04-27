const app = require("./app");
const router=require('./routes')
const Port = process.env.Port || 5001;
app.use('/', router);

app.listen(Port,()=>{
    console.log(`running on port ${Port}`);
})