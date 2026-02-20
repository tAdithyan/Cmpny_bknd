exports.uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'No file uploaded'
        });
    }

    // Construct public URL (assuming uploads are served from root/uploads)
    const filePath = `/uploads/${req.file.filename}`;

    res.status(200).json({
        message: 'File uploaded successfully',
        filePath: filePath
    });
};
