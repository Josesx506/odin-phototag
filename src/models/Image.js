import mongoose from 'mongoose';

const BoundingBoxSchema = new mongoose.Schema({
  top: { type: Number, required: true },
  left: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
}, { _id: false });

const TargetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  boundingBoxes: {
    type: [BoundingBoxSchema],
    default: [],
    required: true
  }
}, { _id: false });

const ImageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  targets: {
    type: [TargetSchema],
    default: [],
    required: true
  }
}, {
  timestamps: true
});

// Export the model
export default mongoose.models.Image || mongoose.model('Image', ImageSchema);