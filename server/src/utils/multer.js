const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '".jpeg' && ext !== '.png' && ext != '.gif') {
            cb(new Error("Unsupported file type!"), false);
            return;
        }
        cb(null, true);
    },
});