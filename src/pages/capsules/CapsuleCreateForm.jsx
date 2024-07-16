import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useRedirect } from '../../hooks/useRedirect';
import CreatEditFormFields from '../../components/CapsuleCreateEditForm/CreatEditFormFields';
import CreateEditFormImages from '../../components/CapsuleCreateEditForm/CreateEditFormImages';
import CreateEditFormVideos from '../../components/CapsuleCreateEditForm/CreateEditFormVideos';
import btnStyles from '../../styles/Button.module.css';

function CapsuleCreateForm() {
  useRedirect('loggedOut');
  const [capsuleData, setCapsuleData] = useState({
    title: '',
    message: '',
    release_date: '',
    images: '',
    uploaded_images: [],
    uploaded_videos: [],
    gemini_message: '',
  });

  const {
    title,
    message,
    release_date,
    uploaded_images,
    uploaded_videos,
    gemini_message,
  } = capsuleData;
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const history = useHistory();
  const [generatedText, setGeneratedText] = useState('');
  const [editableGeneratedText, setEditableGeneratedText] = useState('');

  const { GoogleGenerativeAI } = require('@google/generative-ai');

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  const run = async () => {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generation_config: { response_mime_type: 'application/json' },
    });

    const prompt = gemini_message;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  };

  const [executionCount, setExecutionCount] = React.useState(0);
  const [lastExecutionTime, setLastExecutionTime] = React.useState(null);

  const executeRun = async () => {
    const currentTime = new Date().getTime();
    if (
      executionCount < 15 ||
      (lastExecutionTime && currentTime - lastExecutionTime > 60000)
    ) {
      setExecutionCount(executionCount + 1);
      setLastExecutionTime(currentTime);
      console.log('Execution count:', executionCount);
      console.log('Last execution time:', lastExecutionTime);
      await run();
    } else {
      console.log('Execution limit exceeded');
    }
  };

  useEffect(() => {
    return () => {
      uploaded_images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
      uploaded_videos.forEach((video) => {
        URL.revokeObjectURL(video.preview);
      });
    };
  }, [uploaded_images, uploaded_videos]);

  const handleChange = (e) => {
    setCapsuleData({
      ...capsuleData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      const fileArray = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        date_taken: '',
      }));
      setCapsuleData({
        ...capsuleData,
        uploaded_images: fileArray,
      });
    }
  };

  const handleChangeVideo = (e) => {
    if (e.target.files.length) {
      const fileArray = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        date_taken: '',
      }));
      setCapsuleData({
        ...capsuleData,
        uploaded_videos: fileArray,
      });
    }
  };

  const handleDateChange = (type, idx, e) => {
    const updatedArray = type === 'image' ? uploaded_images : uploaded_videos;
    const updatedFiles = updatedArray.map((item, itemIdx) =>
      itemIdx === idx ? { ...item, date_taken: e.target.value } : item
    );
    setCapsuleData({
      ...capsuleData,
      [type === 'image' ? 'uploaded_images' : 'uploaded_videos']: updatedFiles,
    });
  };

  const createMultipartUpload = async (fileName) => {
    const formData = new FormData();
    formData.append('file_name', fileName);
    const { data } = await axiosReq.post(
      '/initiate_multipart_upload/',
      formData
    );
    console.log('Upload ID:', data.uploadId);
    return data.uploadId;
  };

  const getPresignedUrl = async (fileName, partNumber, uploadId) => {
    console.log(
      `Requesting presigned URL for part ${partNumber} of ${fileName} with uploadId ${uploadId}`
    );
    const { data } = await axiosReq.get('/generate_presigned_url/', {
      params: {
        file_name: fileName,
        part_number: partNumber,
        upload_id: uploadId,
      },
    });
    console.log(`Received presigned URL: ${data.url}`);
    return data.url;
  };

  const completeMultipartUpload = async (uploadId, parts, fileName) => {
    try {
      const response = await axiosReq.post('/complete_multipart_upload/', {
        uploadId,
        parts,
        fileName,
      });
      console.log('Uploaded to S3:', response.data); // Handle the response as needed
      return response.data.url; // Return the JSON response from your Django endpoint
    } catch (error) {
      console.error('Error completing multipart upload:', error);
      throw error; // Handle or propagate the error
    }
  };

  const uploadPart = async (filePart, presignedUrl) => {
    const response = await axios.put(presignedUrl, filePart, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.headers.etag;
  };

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

  const uploadFileInParts = async (file, setUploadProgress) => {
    const fileSize = file.size;
    const fileName = file.name;
    const numberOfParts = Math.ceil(fileSize / CHUNK_SIZE);

    const uploadId = await createMultipartUpload(fileName);

    console.log('Uploading file in parts:', fileName);
    console.log('uploadId:', uploadId);

    const parts = [];

    for (let partNumber = 1; partNumber <= numberOfParts; partNumber++) {
      const start = (partNumber - 1) * CHUNK_SIZE;
      const end = partNumber * CHUNK_SIZE;
      const filePart = file.slice(start, end);

      const presignedUrl = await getPresignedUrl(
        fileName,
        partNumber,
        uploadId
      );
      const etag = await uploadPart(filePart, presignedUrl);

      parts.push({ ETag: etag, PartNumber: partNumber });

      const percentCompleted = (partNumber / numberOfParts) * 100;
      setUploadProgress(percentCompleted);
    }

    const finalUrl = await completeMultipartUpload(uploadId, parts, fileName);

    return finalUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadProgress(0);

    const uploadedImageUrls = [];
    const uploadedVideoUrls = [];

    // Function to handle the upload process for each file
    const handleFileUpload = async (file) => {
      // Get the file name
      const fileName = file.name;

      // Create multipart upload and get upload ID
      const uploadId = await createMultipartUpload(fileName);
      console.log(`Upload ID for ${fileName}:`, uploadId);

      // Upload file in parts
      const finalUrl = await uploadFileInParts(
        file,
        setUploadProgress,
        uploadId
      );
      console.log(`Final URL for ${fileName}:`, finalUrl);

      return finalUrl;
    };

    // Upload images
    for (const { file } of uploaded_images) {
      const finalUrl = await handleFileUpload(file);
      uploadedImageUrls.push(finalUrl);
    }

    // Upload videos
    for (const { file } of uploaded_videos) {
      const finalUrl = await handleFileUpload(file);
      uploadedVideoUrls.push(finalUrl);
    }

    const metadata = {
      uploaded_images_metadata: uploaded_images.map(
        ({ date_taken, file }, idx) => ({
          url: uploadedImageUrls[idx],
          date_taken: `${date_taken}T12:00:00Z`,
          gemini_messages: [
            { message: `${editableGeneratedText} ${file.name}` },
          ],
        })
      ),
      uploaded_videos_metadata: uploaded_videos.map(
        ({ date_taken, file }, idx) => ({
          url: uploadedVideoUrls[idx],
          date_taken: `${date_taken}T12:00:00Z`,
          gemini_messages: [
            { message: `${editableGeneratedText} ${file.name}` },
          ],
        })
      ),
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('message', message);
    formData.append('release_date', release_date);
    formData.append(
      'uploaded_images_metadata',
      JSON.stringify(metadata.uploaded_images_metadata)
    );
    formData.append(
      'uploaded_videos_metadata',
      JSON.stringify(metadata.uploaded_videos_metadata)
    );

    try {
      const { data } = await axiosReq.post('/capsules/', formData);
      history.push(`/capsules/${data.id}`);
      console.log('Capsule created');
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleEditableTextChange = (e) => {
    setEditableGeneratedText(e.target.value);
  };

  const generateGeminiMessage = async (e) => {
    const generatedMessage = await run();
    setGeneratedText(generatedMessage);
    setEditableGeneratedText(generatedMessage);
    executeRun();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <CreatEditFormFields
          capsuleData={capsuleData}
          errors={errors}
          handleChange={handleChange}
        />
        <CreateEditFormImages
          capsuleData={capsuleData}
          errors={errors}
          handleChangeImage={handleChangeImage}
          imageInput={imageInput}
          handleDateChange={handleDateChange}
        />
        <CreateEditFormVideos
          capsuleData={capsuleData}
          errors={errors}
          handleChangeVideo={handleChangeVideo}
          videoInput={videoInput}
          handleDateChange={handleDateChange}
        />
        <Form.Group>
          <Form.Label htmlFor='release_date' style={{ color: 'black' }}>
            Gemini message input
          </Form.Label>
          <Form.Control
            type='text'
            name='gemini_message'
            value={capsuleData.gemini_message}
            onChange={handleChange}
            style={{ color: 'black' }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label
            htmlFor='generated_gemini_message'
            style={{ color: 'black' }}
          >
            Generated Gemini message
          </Form.Label>
          <Alert variant='info'>
            <Form.Control
              as='textarea'
              rows={editableGeneratedText.length / 50}
              name='generated_gemini_message'
              onChange={handleEditableTextChange}
              value={editableGeneratedText}
              className={btnStyles.ButtonPrimary}
            />
          </Alert>
        </Form.Group>
        <button
          className={`${btnStyles.Button} ${btnStyles.ButtonSecondary} btn mb-5`}
          onClick={generateGeminiMessage}
        >
          {generatedText
            ? 'Regenerate Gemini message'
            : 'Generate Gemini message'}
        </button>

        {/* <div>
          {gemini_message && (
            <Alert variant='info'>
              <p>Generated Gemini message:</p>

              <p>{generatedText}</p>
            </Alert>
          )}
        </div> */}
        {uploadProgress > 0 && (
          <div className='progress'>
            <div
              className='progress-bar'
              role='progressbar'
              style={{ width: `${uploadProgress}%` }}
              aria-valuenow={uploadProgress}
              aria-valuemin='0'
              aria-valuemax='100'
            >
              {uploadProgress}%
            </div>
          </div>
        )}
        <Row>
          <button
            className={`${btnStyles.Button} ${btnStyles.ButtonSecondary} mx-auto btn mb-5`}
            type='submit'
          >
            Create Capsule
          </button>
        </Row>
      </Container>
    </Form>
  );
}

export default CapsuleCreateForm;
