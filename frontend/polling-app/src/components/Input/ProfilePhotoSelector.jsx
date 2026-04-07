/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
const ProfilePhotoSelector = ({ image, setImage }) => {
  // Ref: gives direct access to the DOM input element
  const inputRef = useRef(null);

  // State: stores preview URL of selected image (for display)
  const [previewUrl, setPreviewUrl] = useState(null);

  // Runs when user selects a file
  const handleImageChange = (event) => {
    // event.target.files → array of selected files
    // LOGIC: will take the selected image and store it
    const file = event.target.files[0];
    if (file) {
      //update the image state
      setImage(file);

      //generate previewUrl from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  // Runs when user removes the image
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Trigger file picker manually
  const onChooseFile = () => {
    // inputRef.current → actual <input> element
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        // LOGIC: only allow image files

        ref={inputRef}
        // JS: attach ref to access input programmatically

        onChange={handleImageChange}
        // LOGIC: when user selects file → run handler

        className="hidden"
      />

      {!previewUrl ? (
        <div className="w-20 h-20 flex items-center justify-center bg-sky-100 rounded-full relative">
          <LuUser className="text-4xl text-primary" />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
