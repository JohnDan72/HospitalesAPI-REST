import mongoose, { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface User {
    nombre      : string;
    email       : string;
    password    : string;
    img         : string;
    role        : string;
    google      : boolean;
    status      : boolean;
}

// 2. Create a Schema corresponding to the document interface.
const UsuarioSchema = new Schema<User>({

    nombre: {
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true,
    },
    img: { 
        type: String
    },
    role: { 
        type: String, 
        default: 'USER_ROLE'
    },
    google: { 
        type: Boolean, 
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// 3. Create a Model.
export default mongoose.model('Usuario', UsuarioSchema);