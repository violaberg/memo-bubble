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
import ProgressBar from 'react-bootstrap/ProgressBar';

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

  // const getPresignedUrl = async (fileName) => {
  //   const response = await axiosReq.get(
  //     `/generate_presigned_url/?file_name=${fileName}`
  //   );
  //   return response.data;
  // };

  // const uploadFileToS3 = async (file, presignedUrl) => {
  //   const formData = new FormData();
  //   Object.keys(presignedUrl.fields).forEach((key) => {
  //     formData.append(key, presignedUrl.fields[key]);
  //   });
  //   formData.append('file', file);

  //   await axios.post(presignedUrl.url, formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //     onUploadProgress: (progressEvent) => {
  //       const percentCompleted = Math.round(
  //         (progressEvent.loaded * 100) / progressEvent.total
  //       );
  //       setUploadProgress(
  //         (prevProgress) =>
  //           prevProgress + percentCompleted / uploaded_videos.length
  //       );
  //     },
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadProgress(0);

    // const uploadedImageUrls = [];
    // for (const { file } of uploaded_images) {
    //   const presignedUrl = await getPresignedUrl(file.name);
    //   await uploadFileToS3(file, presignedUrl);
    //   uploadedImageUrls.push(presignedUrl.url + presignedUrl.fields.key);
    // }

    // const uploadedVideoUrls = [];
    // for (const { file } of uploaded_videos) {
    //   const presignedUrl = await getPresignedUrl(file.name);
    //   await uploadFileToS3(file, presignedUrl);
    //   uploadedVideoUrls.push(presignedUrl.url + presignedUrl.fields.key);
    // }

    // const metadata = {
    //   uploaded_images_metadata: uploaded_images.map(
    //     ({ date_taken, file }, idx) => ({
    //       url: uploadedImageUrls[idx],
    //       date_taken: `${date_taken}T12:00:00Z`,
    //       gemini_messages: [
    //         { message: `Gemini message for image ${file.name}` },
    //       ],
    //     })
    //   ),
    //   uploaded_videos_metadata: uploaded_videos.map(
    //     ({ date_taken, file }, idx) => ({
    //       url: uploadedVideoUrls[idx],
    //       date_taken: `${date_taken}T12:00:00Z`,
    //       gemini_messages: [
    //         { message: `Gemini message for video ${file.name}` },
    //       ],
    //     })
    //   ),
    // };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('message', message);
    formData.append('release_date', release_date);
    formData.append('gemini_message', run());
    // formData.append(
    //   'uploaded_images_metadata',
    //   JSON.stringify(metadata.uploaded_images_metadata)
    // );
    // formData.append(
    //   'uploaded_videos_metadata',
    //   JSON.stringify(metadata.uploaded_videos_metadata)
    // );

    try {
      // const { data } = await axiosReq.post('/capsules/', formData, {
      //   onUploadProgress: (progressEvent) => {
      //     const percentCompleted = Math.round(
      //       (progressEvent.loaded * 100) / progressEvent.total
      //     );
      //     setUploadProgress(percentCompleted);
      //   },
      // });
      // history.push(`/capsules/${data.id}`);
      const generatedMessage = await run();
      setGeneratedText(generatedMessage);
      setEditableGeneratedText(generatedMessage);
      console.log('formData', formData.get('gemini_message'));
      executeRun();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleEditableTextChange = (e) => {
    setEditableGeneratedText(e.target.value);
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
          <Form.Control
            as='textarea'
            rows={editableGeneratedText.length / 50}
            name='generated_gemini_message'
            onChange={handleEditableTextChange}
            value={editableGeneratedText}
          />
        </Form.Group>

        <div>
          {gemini_message && (
            <Alert variant='info'>
              <p>Generated Gemini message:</p>

              <p>{generatedText}</p>
            </Alert>
          )}
        </div>
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
