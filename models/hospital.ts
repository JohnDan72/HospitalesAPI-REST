import mongoose , { model, ObjectId, Schema } from "mongoose";

interface Hospi {
    nombre      : string;
    img         : string;
    status      : boolean;
    createdByUser : ObjectId;
}

const HospitalSchema = new Schema<Hospi>({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    createdByUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario',
    },
}, { collection: 'hospitales'});

HospitalSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


export default mongoose.model('Hospital', HospitalSchema);