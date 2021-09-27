import mongoose from "mongoose";


export const dbConnection = async () => {
    try {
        const url: string = process.env.MONGO_CONNECTION + '';
        await mongoose.connect(   
            url
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
