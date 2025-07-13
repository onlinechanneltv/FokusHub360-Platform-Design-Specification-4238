import AWS from 'aws-sdk';
import toast from 'react-hot-toast';

// S3 Configuration
const S3_CONFIG = {
  bucketName: process.env.REACT_APP_S3_BUCKET_NAME || 'fokushub360-uploads',
  region: process.env.REACT_APP_S3_REGION || 'us-east-1',
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  signatureVersion: 'v4'
};

// Initialize S3
const s3 = new AWS.S3({
  accessKeyId: S3_CONFIG.accessKeyId,
  secretAccessKey: S3_CONFIG.secretAccessKey,
  region: S3_CONFIG.region,
  signatureVersion: S3_CONFIG.signatureVersion
});

// Generate unique filename
const generateUniqueFilename = (originalFilename) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileExtension = originalFilename.split('.').pop();
  return `uploads/${timestamp}-${randomString}.${fileExtension}`;
};

// Upload file to S3
export const uploadFileToS3 = async (file, folder = 'general', onProgress = null) => {
  try {
    if (!S3_CONFIG.accessKeyId || !S3_CONFIG.secretAccessKey) {
      throw new Error('S3 credentials not configured. Please check environment variables.');
    }

    const filename = generateUniqueFilename(file.name);
    const key = `${folder}/${filename}`;

    const params = {
      Bucket: S3_CONFIG.bucketName,
      Key: key,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read', // Make files publicly accessible
      Metadata: {
        'original-name': file.name,
        'upload-timestamp': new Date().toISOString()
      }
    };

    // Create upload promise with progress tracking
    const upload = s3.upload(params);

    if (onProgress) {
      upload.on('httpUploadProgress', (progress) => {
        const percentage = Math.round((progress.loaded / progress.total) * 100);
        onProgress(percentage);
      });
    }

    const result = await upload.promise();
    
    return {
      success: true,
      url: result.Location,
      key: result.Key,
      bucket: result.Bucket,
      filename: file.name,
      size: file.size,
      type: file.type
    };

  } catch (error) {
    console.error('S3 Upload Error:', error);
    toast.error('File upload failed: ' + error.message);
    throw error;
  }
};

// Upload multiple files
export const uploadMultipleFilesToS3 = async (files, folder = 'general', onProgress = null) => {
  try {
    const uploadPromises = files.map((file, index) => {
      return uploadFileToS3(file, folder, (progress) => {
        if (onProgress) {
          onProgress(index, progress);
        }
      });
    });

    const results = await Promise.all(uploadPromises);
    return results;

  } catch (error) {
    console.error('Multiple file upload error:', error);
    throw error;
  }
};

// Delete file from S3
export const deleteFileFromS3 = async (key) => {
  try {
    const params = {
      Bucket: S3_CONFIG.bucketName,
      Key: key
    };

    await s3.deleteObject(params).promise();
    return { success: true };

  } catch (error) {
    console.error('S3 Delete Error:', error);
    throw error;
  }
};

// Get signed URL for temporary access
export const getSignedUrl = async (key, expiresIn = 3600) => {
  try {
    const params = {
      Bucket: S3_CONFIG.bucketName,
      Key: key,
      Expires: expiresIn
    };

    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;

  } catch (error) {
    console.error('Signed URL Error:', error);
    throw error;
  }
};

// List files in S3 bucket
export const listS3Files = async (folder = '', maxKeys = 100) => {
  try {
    const params = {
      Bucket: S3_CONFIG.bucketName,
      Prefix: folder,
      MaxKeys: maxKeys
    };

    const result = await s3.listObjectsV2(params).promise();
    
    return {
      files: result.Contents.map(file => ({
        key: file.Key,
        size: file.Size,
        lastModified: file.LastModified,
        url: `https://${S3_CONFIG.bucketName}.s3.${S3_CONFIG.region}.amazonaws.com/${file.Key}`
      })),
      isTruncated: result.IsTruncated,
      nextContinuationToken: result.NextContinuationToken
    };

  } catch (error) {
    console.error('List S3 files error:', error);
    throw error;
  }
};

// Check S3 configuration
export const checkS3Configuration = async () => {
  try {
    if (!S3_CONFIG.accessKeyId || !S3_CONFIG.secretAccessKey) {
      return {
        configured: false,
        error: 'S3 credentials not provided'
      };
    }

    // Test connection by listing bucket
    await s3.headBucket({ Bucket: S3_CONFIG.bucketName }).promise();
    
    return {
      configured: true,
      bucketName: S3_CONFIG.bucketName,
      region: S3_CONFIG.region
    };

  } catch (error) {
    return {
      configured: false,
      error: error.message
    };
  }
};

export default {
  uploadFileToS3,
  uploadMultipleFilesToS3,
  deleteFileFromS3,
  getSignedUrl,
  listS3Files,
  checkS3Configuration
};