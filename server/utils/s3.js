const sharp = require("sharp");
const {
  S3Client,
  PutObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");

const { generateSubfolderId, generateImageId } = require("./nanoid");

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});
const bucketUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/`;

const uploadProductImages = async (title, files) => {
  title = title
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, "_");
  const urls = [];
  const subfolder = title + generateSubfolderId();

  for (const file of files) {
    const buffer = await sharp(file.buffer)
      .resize({
        height: 658,
        width: 542,
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .toFormat("png", {
        palette: true,
        effort: 9,
      })
      .toBuffer();
    const key = `products/${subfolder}/${generateImageId()}.png`;

    const command = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.mimetype,
    });
    await s3.send(command);
    const url = bucketUrl + key;
    urls.push(url);
  }

  return urls;
};

const updateProductImages = async (
  prevImageUrls,
  imageUrls,
  prevTitle,
  title,
  uploadFiles
) => {
  let newImgUrls = [...imageUrls];

  if (prevImageUrls.length !== imageUrls.length) {
    const unusedUrls = prevImageUrls.filter((url) => !imageUrls.includes(url));
    const unusedKeys = unusedUrls.map((url) => ({
      Key: url.replace(bucketUrl, ""),
    }));
    const deleteCmd = new DeleteObjectsCommand({
      Bucket: AWS_BUCKET_NAME,
      Delete: {
        Objects: unusedKeys,
        Quiet: true,
      },
    });
    await s3.send(deleteCmd);
  }

  const sanitizedTitle = title
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, "_");
  const subfolder = sanitizedTitle + generateSubfolderId();

  if (imageUrls.length > 0 && prevTitle !== title) {
    newImgUrls = [];

    for (const imgUrl of imageUrls) {
      const prevKey = imgUrl.replace(bucketUrl, "");
      const imgName = prevKey.split("/")[2];
      const key = `products/${subfolder}/${imgName}`;

      const copyCmd = new CopyObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        CopySource: `${AWS_BUCKET_NAME}/${prevKey}`,
        Key: key,
      });
      const deleteCmd = new DeleteObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: prevKey,
      });

      await s3.send(copyCmd);
      await s3.send(deleteCmd);

      const url = bucketUrl + key;
      newImgUrls.push(url);
    }
  }

  if (uploadFiles.length > 0) {
    let uploadSubfolder = subfolder;
    if (newImgUrls.length > 0)
      uploadSubfolder = newImgUrls[0].replace(bucketUrl, "").split("/")[1];

    for (const file of uploadFiles) {
      const buffer = await sharp(file.buffer)
        .resize({
          height: 658,
          width: 542,
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .toFormat("png", {
          palette: true,
          effort: 9,
        })
        .toBuffer();
      const key = `products/${uploadSubfolder}/${generateImageId()}.png`;

      const putCmd = new PutObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.mimetype,
      });
      await s3.send(putCmd);
      const url = bucketUrl + key;

      newImgUrls.push(url);
    }
  }
  return newImgUrls;
};

const deleteProductImages = async (urls) => {
  for (const url of urls) {
    const key = url.replace(bucketUrl, "");
    const command = new DeleteObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    });
    await s3.send(command);
  }
};

const changeProfileImage = async (prevAvatar, email, file) => {
  let subfolder;

  if (prevAvatar.startsWith(bucketUrl)) {
    const deleteKey = prevAvatar.replace(bucketUrl, "");
    const deleteCommand = new DeleteObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: deleteKey,
    });
    subfolder = deleteKey.split("/")[1];
    await s3.send(deleteCommand);
  } else {
    email = email
      .split("@")[0]
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toUpperCase()
      .trim()
      .replace(/\s+/g, "_");
    subfolder = email + generateSubfolderId();
  }

  const buffer = await sharp(file.buffer)
    .resize({
      height: 250,
      width: 250,
      fit: "cover",
    })
    .toFormat("png", {
      palette: true,
      effort: 9,
    })
    .toBuffer();

  const putKey = `users/${subfolder}/${generateImageId()}.jpeg`;
  const putCommand = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: putKey,
    Body: buffer,
    ContentType: file.mimetype,
  });
  await s3.send(putCommand);

  const avatar = bucketUrl + putKey;
  return avatar;
};

const deleteProfileImage = async (prevAvatar) => {
  if (!prevAvatar.startsWith(bucketUrl)) return;

  const deleteKey = prevAvatar.replace(bucketUrl, "");
  const deleteCommand = new DeleteObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: deleteKey,
  });
  await s3.send(deleteCommand);
};

module.exports = {
  uploadProductImages,
  updateProductImages,
  deleteProductImages,
  changeProfileImage,
  deleteProfileImage,
};
