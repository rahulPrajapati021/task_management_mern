import mongoose, {Schema, SchemaTypes} from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: [10, "min length for title is 10"],
        max: [200, "max length for title is 200"]
    },
    description: {
        type: String,
        required: true,
        min: [10, "min length for description is 10"],
        max: [5000, "max length for description is 5000"]
    },
    dueDate: {
        type: Date,
        required: true, 
    },
    priority: {
        type: Number,
        enum: [1, 2, 3], // [High, Medium, Low]
        default: 3
    },
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    }
});

export default mongoose.model("Task", taskSchema);