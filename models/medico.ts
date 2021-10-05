import mongoose , { model, ObjectId, Schema } from "mongoose";

interface Medic {
    nombre      : string;
    img         : string;
    status      : boolean;
    createdByUser : ObjectId;
    hospital : ObjectId;
}
const MedicoSchema = new Schema<Medic>({
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
    hospital: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Hospital',
    },
});

MedicoSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


export default mongoose.model('Medico', MedicoSchema);