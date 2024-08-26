import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {app} from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice";


const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const filePickerRef = useRef();

  const [imageFile, setImageFile] = useState(null);

  const [imgaeFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const[imageFileUploadError, setImageFileUploadError] = useState('');
  const [imageFileUploading, setImageFileUploading] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const [formData, setFormData] = useState({});

  const handleImageChange =(e) => {
    const file = e.target.files[0];
    if(file){
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile){
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async() => {
    
    setImageFileUploading(null);
    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));

      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2mb)');
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploadProgress(false);

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downlaodURL) => {

          setImageFileUrl(downlaodURL);
          setFormData({...formData, profilePicture: downlaodURL});
          setImageFileUploadProgress(null);
          setImageFileUploading(false);
        })
      }
    )
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit= async(e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0 ){
      setUpdateUserError('No Changes Made');
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {

      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if(!res.ok){
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }else{
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('Profile updated Successfully');
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    
      <div className="max-w-lg mx-auto p-3 w-full">
          <h1 className="my-7 text-center text-3xl">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
          <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar 
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  store: `rgba(62, 152, 199, ${imageFileUploadProgress/100})`
                },
              }}
              />
            )}
              <img
              src={imgaeFileUrl || currentUser.profilePicture}
              alt="pic"
              className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
              />
          </div>
            {imageFileUploadError && (
              <Alert color='failure'>{imageFileUploadError}</Alert>
            )}

          <div className="flex flex-col gap-3 mt-2">
          <TextInput
          type ='text'
          id = 'username' placeholder="Username" defaultValue={currentUser.username}
          onChange={handleChange}
          />
          <TextInput
          type ='text'
          id = 'email' placeholder="email" defaultValue={currentUser.email}
          onChange={handleChange}
          />
          <TextInput
          type ='text'
          id = 'password' placeholder="Change Your Password" 
          onChange={handleChange}
          />
          <Button type="submit">
            Submit
          </Button>
          </div>
        </form>
        <div className="text-red-500 flex justify-between mt-3">
            <span>Edit</span>
            <span>Delete</span>
        </div>

            {updateUserSuccess && (
              <Alert color='success'>{updateUserSuccess}</Alert>
            )}

            {updateUserError && (
              <Alert color='failure'>{updateUserError}</Alert>
            )}

      </div>
    
  );
};

export default DashProfile;
