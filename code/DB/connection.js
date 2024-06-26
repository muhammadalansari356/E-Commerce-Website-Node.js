import mongoose from 'mongoose'
const connectDB  = async ()=>{
    console.log(process.env.DB_LOCAL);
    return await mongoose.connect(process.env.DB_LOCAL)
    //mongodb://localhost:27017/EcommeceOnline
    .then(res=>console.log(`DB Connected successfully on .........`))
    .catch(err=>console.log(` Fail to connect  DB.........${err} `))
}


export default connectDB;

// import mongoose from "mongoose"

// export const dbConnection = async () => {
//     //const dbString = 'mongodb://localhost:27017';
//     const dbString = "mongodb+srv://muhammadalansari356:AlAnsari12345m@cluster0.ce9vbcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//  //const dbString = "mongodb+srv://muhammadalansari356:THqY6QQL2siYjWoB@cluster0.ymmfgce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//     await mongoose.connect(dbString).then(() => {
//         console.log("db connect success");
//     }).catch((err) => {
//         console.log("db connect fail");
//     })
// }