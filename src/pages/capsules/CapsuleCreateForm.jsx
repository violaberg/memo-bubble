import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useRedirect } from '../../hooks/useRedirect';
import CreatEditFormFields from '../../components/CreatEditFormFields';
import CreateEditFormImages from '../../components/CreateEditFormImages';
import CreateEditFormVideos from '../../components/CreateEditFormVideos';
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
  });

  const { title, message, release_date, uploaded_images, uploaded_videos } =
    capsuleData;
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const history = useHistory();

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

  const getPresignedUrl = async (fileName) => {
    const response = await axiosReq.get(
      `/generate_presigned_url/?file_name=${fileName}`
    );
    console.log('response', response.data);
    return response.data;
  };

  const uploadFileToS3 = async (file, presignedUrl) => {
    const formData = new FormData();
    Object.keys(presignedUrl.fields).forEach((key) => {
      formData.append(key, presignedUrl.fields[key]);
    });
    formData.append('file', file);

    await axios.post(presignedUrl.url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(
          (prevProgress) =>
            prevProgress + percentCompleted / uploaded_videos.length
        );
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadProgress(0);

    const uploadedImageUrls = [];
    for (const { file } of uploaded_images) {
      const presignedUrl = await getPresignedUrl(file.name);
      await uploadFileToS3(file, presignedUrl);
      uploadedImageUrls.push(presignedUrl.url + presignedUrl.fields.key);
    }

    const uploadedVideoUrls = [];
    for (const { file } of uploaded_videos) {
      const presignedUrl = await getPresignedUrl(file.name);
      await uploadFileToS3(file, presignedUrl);
      uploadedVideoUrls.push(presignedUrl.url + presignedUrl.fields.key);
    }

    const metadata = {
      uploaded_images_metadata: uploaded_images.map(
        ({ date_taken, file }, idx) => ({
          url: uploadedImageUrls[idx],
          date_taken: `${date_taken}T12:00:00Z`,
          gemini_messages: [
            { message: `Gemini message for image ${file.name}` },
          ],
        })
      ),
      uploaded_videos_metadata: uploaded_videos.map(
        ({ date_taken, file }, idx) => ({
          url: uploadedVideoUrls[idx],
          date_taken: `${date_taken}T12:00:00Z`,
          gemini_messages: [
            { message: `Gemini message for video ${file.name}` },
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
      const { data } = await axiosReq.post('/capsules/', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      history.push(`/capsules/${data.id}`);
    } catch (err) {
      setErrors(err.response?.data);
    }
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
