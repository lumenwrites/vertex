import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
    slug: { type: 'String', required: true },
    body: { type: 'String', required: true },
    tags: [String],
    published: { type: 'Boolean', default: true },   
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Post', postSchema);
