import mongoose from 'mongoose';


const LeaderboardEntrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: Number, required: true }
}, { _id: false });

const LeaderboardSchema = new mongoose.Schema({
  imageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Image', required: true 
  },
  title: { type: String, required: true },  
  entries: {
    type: [LeaderboardEntrySchema], default: [], required: true
  }
}, {
  timestamps: true
});

// Create an index for faster queries based on imageId
LeaderboardSchema.index({ imageId: 1, time: 1 });

// Export the model
export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);