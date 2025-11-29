import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import fileModel from "../models/fileModel.js";
import upload from "../middleware/multer.js"; 
import { v2 as cloudinary } from "cloudinary";

// ================= Doctor Login =================
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await doctorModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ================= Get Doctor Appointments =================
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ================= Cancel Appointment =================
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: 'Appointment Cancelled' });
        }
        res.json({ success: false, message: 'Appointment Cancelled' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ================= Complete Appointment =================
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: 'Appointment Completed' });
        }
        res.json({ success: false, message: 'Appointment not found or invalid' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ================= Upload Lab Report / E-prescription =================
// ================= Upload Lab Report / E-prescription to Cloudinary =================
const uploadFile = async (req, res) => {
    try {
        const { type, notes, appointmentId } = req.body;
        const file = req.file;

        // File validation
        if (!file) return res.status(400).json({ success: false, message: "File is required" });
        
        // Validate file type
        if (!["labreport", "eprescription"].includes(type)) {
            return res.status(400).json({ success: false, message: "Invalid file type. Must be 'labreport' or 'eprescription'" });
        }
        
        // Validate file size (5MB max)
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > MAX_FILE_SIZE) {
            return res.status(400).json({ success: false, message: "File size exceeds the 5MB limit" });
        }
        
        // Validate file format (PDF, JPG, PNG)
        const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid file format. Only PDF, JPG, and PNG files are allowed" 
            });
        }

        // Check if appointment exists and is completed
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }
        
        if (!appointment.isCompleted) {
            return res.status(400).json({ 
                success: false, 
                message: "Cannot upload file before appointment completion" 
            });
        }

        // Upload file to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, { 
            resource_type: "auto",
            folder: `medical_files/${appointment.userId}/${appointmentId}`
        });

        // Create file record with proper relationships
        const newFile = await fileModel.create({
            type,
            url: uploadResult.secure_url,
            fileName: file.originalname,
            fileSize: file.size,
            fileType: file.mimetype,
            notes,
            patientId: appointment.userId,
            doctorId: appointment.docId,
            appointmentId,
            uploadDate: new Date()
        });

        return res.status(200).json({ 
            success: true, 
            message: "File uploaded successfully", 
            file: newFile 
        });
    } catch (error) {
        console.error("File upload error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "An error occurred while uploading the file",
            error: error.message
        });
    }
};

// ================= Get Files for an Appointment (Doctor View) =================
const getFilesByAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const doctorId = req.doctor._id.toString();
        
        // Verify the appointment belongs to this doctor
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }
        
        if (appointment.docId !== doctorId) {
            return res.status(403).json({ 
                success: false, 
                message: "You don't have permission to access files for this appointment" 
            });
        }
        
        // Get files for this appointment
        const files = await fileModel.find({ 
            appointmentId,
            isDeleted: false
        }).sort({ uploadDate: -1 });
        
        return res.status(200).json({ success: true, files });
    } catch (error) {
        console.error("Error retrieving files:", error);
        return res.status(500).json({ success: false, message: "Failed to retrieve files" });
    }
};


// ================= Other Existing APIs =================
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: 'Availability Changed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');
        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body;
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
        res.json({ success: true, message: 'Profile Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;
        appointments.map(item => {
            if (item.isCompleted || item.payment) earnings += item.amount;
        });

        let patients = [];
        appointments.map(item => {
            if (!patients.includes(item.userId)) patients.push(item.userId);
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse()
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ================= Export All =================
export {
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    doctorList,
    changeAvailablity,
    doctorProfile,
    updateDoctorProfile,
    doctorDashboard,
    uploadFile,
    getFilesByAppointment
};
