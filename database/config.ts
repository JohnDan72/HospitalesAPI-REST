import mongoose from "mongoose";


export const dbConnection = async () => {
    try {
        await mongoose.connect(   
            process.env.MONGO_CONNECTION || ''
            ,
            () => {
                console.log("MongoDB connected!")
            }
        )
    } catch (error) {
        console.log(error);
        throw new Error('Falló al levantar mongodb');
    }
    
}
