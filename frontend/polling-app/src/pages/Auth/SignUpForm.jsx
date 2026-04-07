/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";
import AuthInput from "../../components/Input/AuthInput";

const SignUpForm = () => {
  // State: stores selected profile picture file or image data
  const [profilePic, setProfilePic] = useState(null);

  // State: stores full name input value
  const [fullName, setFullName] = useState("");

  // State: stores email input value
  const [email, setEmail] = useState("");

  // State: stores username input value
  const [username, setUsername] = useState("");

  // State: stores password input value
  const [password, setPassword] = useState("");

  // State: stores error message
  const [error, setError] = useState(null);

  // Function from react-router-dom used later to move to another page
  const navigate = useNavigate();

  // Runs when the signup form is submitted
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Prevent the browser from refreshing the page
    // Keep form handling inside React
  };

  return (
    <AuthLayout>
      {/* Main signup content area */}
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        {/* Page title */}
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>

        {/* Subtitle */}
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        {/* Form submit triggers handleSignUp */}
        <form onSubmit={handleSignUp}>
          {/* Reusable component to choose profile photo */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AuthInput
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <AuthInput
              value={email}
              // LOGIC: input displays state

              onChange={({ target }) => setEmail(target.value)}
              // JS: destructuring event → target.value
              // LOGIC: user types → update email state

              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />

            <AuthInput
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              // LOGIC: user types → update password state

              label="Username"
              placeholder="@"
              type="text"
            />
            <AuthInput
              value={password}
              // LOGIC: input linked to password state

              onChange={({ target }) => setPassword(target.value)}
              // LOGIC: user types → update password state

              label="Password"
              placeholder="Minimum 8 characters"
              type="password"
            />
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="button-primary">
            Create an Account
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpForm;
