import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {app} from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const filePickerRef = useRef();

  const [imageFile, setImageFile] = useState(null);

  const [imgaeFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const[imageFileUploadError, setImageFileUploadError] = useState('');
  const [imageFileUploading, setImageFileUploading] = useState(null);

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
          setImageFileUploadProgress(null);
          setImageFileUploading(false);
        })
      }
    )
  };

  console.log(imageFile, imgaeFileUrl);
  return (
    <div>
      <div className="max-w-lg mx-auto p-3 w-full">
          <h1 className="my-7 text-center text-3xl">Profile</h1>
        <form className="flex flex-col gap-2">
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
          />
          <TextInput
          type ='text'
          id = 'email' placeholder="email" defaultValue={currentUser.email}
          />
          <TextInput
          type ='text'
          id = 'password' placeholder="Change Your Password" 
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
      </div>
    </div>
  );
};

export default DashProfile;
