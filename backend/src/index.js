import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/index.js';
dotenv.config();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server is listening on port no ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log("DATABASE CONNECTION FAILED !!!!!",error)
    process.exit(1);
})