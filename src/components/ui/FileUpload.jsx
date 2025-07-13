import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from './Button';
import Card from './Card';
import Badge from './Badge';
import { uploadFileToS3, uploadMultipleFilesToS3 } from '../../utils/s3Upload';
import toast from 'react-hot-toast';

const { FiUpload, FiFile, FiX, FiCheck, FiLoader } = FiIcons;

const FileUpload = ({ 
  onUploadComplete, 
  onUploadError,
  multiple = false,
  acceptedFileTypes = {},
  maxFileSize = 50 * 1024 * 1024, // 50MB default
  folder = 'general',
  className = ''
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach(error => {
          if (error.code === 'file-too-large') {
            toast.error(`${file.name} is too large. Max size is ${Math.round(maxFileSize / 1024 / 1024)}MB`);
          } else if (error.code === 'file-invalid-type') {
            toast.error(`${file.name} has invalid file type`);
          } else {
            toast.error(`Error with ${file.name}: ${error.message}`);
          }
        });
      });
    }

    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setUploadProgress({});

    try {
      if (multiple) {
        // Handle multiple file upload
        const results = await uploadMultipleFilesToS3(
          acceptedFiles, 
          folder,
          (fileIndex, progress) => {
            setUploadProgress(prev => ({
              ...prev,
              [fileIndex]: progress
            }));
          }
        );

        setUploadedFiles(prev => [...prev, ...results]);
        onUploadComplete && onUploadComplete(results);
        toast.success(`${results.length} files uploaded successfully!`);

      } else {
        // Handle single file upload
        const file = acceptedFiles[0];
        const result = await uploadFileToS3(
          file,
          folder,
          (progress) => {
            setUploadProgress({ 0: progress });
          }
        );

        setUploadedFiles([result]);
        onUploadComplete && onUploadComplete(result);
        toast.success('File uploaded successfully!');
      }

    } catch (error) {
      console.error('Upload error:', error);
      onUploadError && onUploadError(error);
      toast.error('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  }, [multiple, maxFileSize, folder, onUploadComplete, onUploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: acceptedFileTypes,
    maxSize: maxFileSize,
    disabled: uploading
  });

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={className}>
      <Card 
        {...getRootProps()}
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          isDragActive 
            ? 'border-primary-500 bg-primary-50' 
            : uploading
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
        padding="lg"
      >
        <input {...getInputProps()} />
        
        <div className="text-center">
          {uploading ? (
            <SafeIcon icon={FiLoader} className="w-12 h-12 text-primary-500 mx-auto mb-4 animate-spin" />
          ) : (
            <SafeIcon icon={FiUpload} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          )}
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {uploading ? 'Uploading...' : 'Upload Files'}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {isDragActive
              ? 'Drop the files here...'
              : `Drag & drop files here, or click to select ${multiple ? 'files' : 'a file'}`
            }
          </p>
          
          <div className="text-sm text-gray-500">
            <p>Max file size: {Math.round(maxFileSize / 1024 / 1024)}MB</p>
            {Object.keys(acceptedFileTypes).length > 0 && (
              <p>Accepted types: {Object.keys(acceptedFileTypes).join(', ')}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Upload Progress */}
      {uploading && Object.keys(uploadProgress).length > 0 && (
        <Card className="mt-4">
          <h4 className="font-medium text-gray-900 mb-3">Upload Progress</h4>
          {Object.entries(uploadProgress).map(([fileIndex, progress]) => (
            <div key={fileIndex} className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>File {parseInt(fileIndex) + 1}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card className="mt-4">
          <h4 className="font-medium text-gray-900 mb-3">Uploaded Files</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.filename}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • Uploaded to S3
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="success" size="sm">Uploaded</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<SafeIcon icon={FiX} />}
                    onClick={() => removeFile(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default FileUpload;