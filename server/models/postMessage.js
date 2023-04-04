import mongoose from 'mongoose';

//We'll create a mongoose schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

//Now we have to turn the schema into a model

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
//export a mongoose modelfrom this file