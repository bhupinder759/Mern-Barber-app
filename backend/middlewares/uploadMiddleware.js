const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: "dqazwakn9",
    api_key: "377798632684398",
    api_secret: "FAbegTCXFjsWamtSxKvvyXhonhU",
});

const storage = multer.memoryStorage();

async function imageUploadUtil(fileBuffer, mimeType) {
    const dataUri = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
    
    const result = await cloudinary.uploader.upload(dataUri, {
        resource_type: 'auto', // Automatically detect resource type (image, video, raw)
    });
    return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
