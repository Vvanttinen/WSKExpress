import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(req.file.path);

  const filename = req.file.path.split('/').pop();
  const thumbnailPath = `${filename}_thumb.png`;
  await sharp(req.file.path)
    .resize(160, 160)
    .png()
    .toFile(thumbnailPath, (err, info) => {
      if (err) {
        console.error('Error creating thumbnail:', err);
        res.status(500).json({ error: 'Failed to create thumbnail' });
        return;
      }
      console.log('Thumbnail created:', info);
    });

  next()
};

export { createThumbnail };
