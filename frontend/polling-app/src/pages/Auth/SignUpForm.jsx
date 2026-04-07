/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";
import AuthInput from "../../components/Input/AuthInput";
import { validateEmail } from "../../utils/helper";

const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  // Function from react-router-dom used later to move to another page
  const navigate = useNavigate();

  // Runs when the signup form is submitted
  const handleSignUp = async (e) => {
    e.preventDefault();

    // VALIDATION 1: check email fullname

    if (!fullName) {
      // LOGIC: if no password → show error
      setError("Please enter your full name");
      return;
    }
    // VALIDATION 2: check email format
    if (!validateEmail(email)) {
      // LOGIC: if email is invalid → show error
      setError("Please enter a valid email address");
      return;
    }

    // VALIDATION 3: check email username

    if (!username) {
      // LOGIC: if no password → show error
      setError("Please enter your username");
      return;
    }

    // VALIDATION 4: check password exists
    if (!password) {
      // LOGIC: if no password → show error
      setError("Please enter your password");
      return;
    }

    // clear error if everything is valid
    setError("");

    //Sign Up API
    try {
      // eslint-disable-next-line no-unused-vars, no-empty
    } catch (error) {}
    // NEXT STEP (not done yet):
    // call backend → login → save token → navigate("/dashboard")
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>

        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
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
