import path from 'path';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
const __dirname = path.resolve();

aws.config.loadFromPath(
  path.join(
    __dirname,
    '/../justcode-5-2nd-jjimterest-back/config/awsconfig.json'
  )
);
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'jjimterest-ji',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 1000).toString() +
          Date.now() +
          '.' +
          file.originalname.split('.').pop()
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
