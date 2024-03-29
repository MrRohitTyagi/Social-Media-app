import { memo, useCallback, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AnimatePresence, motion } from "framer-motion";
import * as yup from "yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";

import "./loginStyles.css";
import InputFileUpload from "@/coreComponents/InputFileUpload";
import { Login } from "@/Controllers/loginController";
import { setCookie } from "@/utils/cookieHandler";
// import { uploadImage } from "@/utils/imageUploadHelper";

const varients = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  transition: { duration: 1 },
};
const LoginScreen = memo(() => {
  const [isSigninForm, setIsSigninForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [errors, setErrors] = useState({});

  const UserSchema = yup.object().shape({
    username: isSigninForm
      ? yup.string().notRequired()
      : yup.string().min(3).max(30).required(),
    email: yup.string().email("Enter correct email"),
    password: yup.string().min(6),
  });

  const handleSubmit = useCallback(
    async (event, payload, isGoogleLogin) => {
      try {
        setIsLoading(true);
        if (event) event.preventDefault();
        const finalPayload = isGoogleLogin ? payload : formData;

        const validatedUser = await UserSchema.validateSync(finalPayload);
        console.log("User is valid:", validatedUser);

        const loginData = await Login(finalPayload);
        setCookie("authToken", loginData.token);
        window.location.href = "/homepage";
        setIsLoading(false);
      } catch (error) {
        setErrors({ [error.path]: error.message });
        window.err = error;
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, UserSchema]
  );

  const handleChange = useCallback(
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });

      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    },
    [errors, formData]
  );

  return (
    <AnimatePresence>
      <div className="login-form-container">
        <div className="form-container-login">
          <form onSubmit={handleSubmit} className="login-actual-form">
            <motion.h2 animate={{ y: 0 }} initial={{ y: -50 }} className="tac">
              {isSigninForm ? "Sign - In" : "Sign - Up"}
            </motion.h2>
            <motion.div
              key={`${isSigninForm}`}
              variants={varients}
              exit={{ opacity: 0 }}
              animate="visible"
              initial="hidden"
              transition="transition"
              className="name-pic-buttons-cont"
            >
              {!isSigninForm && (
                <TextField
                  size="large"
                  label="Name"
                  error={errors?.username}
                  helperText={errors?.username}
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <InputFileUpload
                          sx={{ marginBottom: "1rem" }}
                          picture={picture}
                          setPicture={setPicture}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </motion.div>
            <motion.div
              variants={varients}
              animate="visible"
              initial="hidden"
              transition="transition"
            >
              <TextField
                label="Email"
                error={errors?.email}
                helperText={errors?.email}
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
            </motion.div>
            <motion.div
              variants={varients}
              animate="visible"
              initial="hidden"
              transition="transition"
            >
              <TextField
                label="Password"
                error={errors?.password}
                helperText={errors?.password}
                type={visible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        size="small"
                        onClick={() => setVisible((p) => !p)}
                      >
                        {visible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
            </motion.div>
            <motion.div
              variants={varients}
              animate="visible"
              initial="hidden"
              transition="transition"
            >
              <Button
                size="small"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {isLoading ? (
                  <div className="sign-in-loader">
                    <CircularProgress sx={{ color: "white" }} size={"small"} />
                    Please Wait
                  </div>
                ) : (
                  "Continue"
                )}
              </Button>
            </motion.div>
            <motion.div
              className="already-have-acc"
              variants={varients}
              animate="visible"
              initial="hidden"
            >
              {isSigninForm ? (
                <h5>Create a new Account ?</h5>
              ) : (
                <h5>Already have a account ?</h5>
              )}
              <h6 onClick={() => setIsSigninForm((prev) => !prev)}>
                {isSigninForm ? "Sign - Up" : "Sign - In"}
              </h6>
            </motion.div>
            <div className="or-cont">
              <Divider
                orientation="horizontal"
                style={{ flexGrow: 1, background: "var(--text-color)" }}
              />
              <h4>OR</h4>
              <Divider
                orientation="horizontal"
                style={{ flexGrow: 1, background: "var(--text-color)" }}
              />
            </div>
            <div className="google-button-login">
              <div className="google-button-wrapper">
                <GoogleLogin
                  type="standard"
                  theme="filled_black"
                  cancel_on_tap_outside
                  onSuccess={(credentialResponse) => {
                    const res = jwtDecode(credentialResponse.credential);
                    console.log("res", res);
                    const payload = {
                      username: res.name,
                      email: res.email,
                      profile: res.picture,
                      password: res.sub,
                    };

                    handleSubmit(undefined, payload, true);
                  }}
                  onError={(error) => {
                    console.log("error", error);
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </AnimatePresence>
  );
});
LoginScreen.displayName = "LoginScreen";

export default LoginScreen;
