import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    // File type and content information
    type: { 
        type: String, 
        required: true, 
        enum: ["labreport", "eprescription"] 
    },
    url: { type: String, required: true },  // file URL or path
    fileName: { type: String, required: true }, // original file name
    fileSize: { type: Number, required: true }, // file size in bytes
    fileType: { type: String, required: true }, // MIME type (e.g., application/pdf, image/jpeg)
    
    // Relationship fields
    patientId: { type: String, required: true, ref: 'user' },
    doctorId: { type: String, required: true, ref: 'doctor' },
    appointmentId: { type: String, required: true, ref: 'appointment' },
    
    // Additional information
    notes: { type: String, default: "" },   // optional notes
    uploadDate: { type: Date, default: Date.now }, // timestamp as Date object
    
    // Status tracking
    isDeleted: { type: Boolean, default: false }
}, { 
    minimize: false,
    timestamps: true // adds createdAt and updatedAt fields
});

// Indexes for faster queries
fileSchema.index({ patientId: 1 });
fileSchema.index({ doctorId: 1 });
fileSchema.index({ appointmentId: 1 });
fileSchema.index({ type: 1 });

const fileModel = mongoose.models.File || mongoose.model("File", fileSchema);
export default fileModel;
