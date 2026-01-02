import mongoose, {Schema, SchemaTypes} from "mongoose";
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    tasks: [
        {
            type: SchemaTypes.ObjectId,
            ref: "Task"
        }
    ]
})

export default mongoose.model("User", userSchema);