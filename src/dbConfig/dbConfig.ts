import mongoose from "mongoose";

export async function connect(){
    try{  
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('mongodb connected');
        })
        connection.on('error',(err)=>{
            console.log('mongodb connection error'+ err);
            process.exit();
        })
} catch(error: any){
    console.log("Error connecting to the database")
    console.log(error.message);
}
}