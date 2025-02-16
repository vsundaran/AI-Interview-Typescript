import { Storage } from "@google-cloud/storage";
import path from "path";
import multer from "multer";
import { MulterGoogleStorage } from "multer-google-storage";

// Initialize Google Cloud Storage
const storage = new Storage({
    keyFilename: path.join(process.cwd(), "../ai-interview-cloud-storgae-e37a7ef2b000.json"),
    projectId: "ai-interview-cloud-storgae",
});

// Define bucket name
const bucketName = "ai-interview-profile-pictures";

// Configure Multer for file uploads
const upload = multer({
    storage: new MulterGoogleStorage({
        bucket: bucketName,
        projectId: "ai-interview-cloud-storgae",
        keyFilename: path.join(process.cwd(), "../ai-interview-cloud-storgae-e37a7ef2b000.json"),
        filename: (req, file, cb) => {
            cb(null, `profiles/${Date.now()}_${file.originalname}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export { storage, upload };
