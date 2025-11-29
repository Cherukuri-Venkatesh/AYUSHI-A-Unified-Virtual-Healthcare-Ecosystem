import express from 'express';
import authDoctor from '../middleware/authDoctor.js';
import upload from '../middleware/multer.js';

import { 
    loginDoctor, 
    appointmentsDoctor, 
    appointmentCancel, 
    doctorList, 
    changeAvailablity, 
    appointmentComplete, 
    doctorDashboard, 
    doctorProfile, 
    updateDoctorProfile,
    uploadFile,
    getFilesByAppointment
} from '../controllers/doctorController.js';

const doctorRouter = express.Router();

doctorRouter.post("/login", loginDoctor);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.get("/list", doctorList);
doctorRouter.post("/change-availability", authDoctor, changeAvailablity);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

// File routes
doctorRouter.post("/upload-file", authDoctor, upload.single('file'), uploadFile);
doctorRouter.get("/files/appointment/:appointmentId", authDoctor, getFilesByAppointment);

// ================= New Routes for File Upload =================
// Upload lab report or e-prescription (only after appointment completion)
doctorRouter.post("/upload-file", authDoctor, upload.single("file"), uploadFile);
// Get all files for a specific appointment
doctorRouter.get("/appointment/:appointmentId/files", authDoctor, getFilesByAppointment);

export default doctorRouter;
