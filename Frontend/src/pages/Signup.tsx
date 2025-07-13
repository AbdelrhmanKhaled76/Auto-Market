import { faEnvelope, faEye, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faCarSide,
  faCheck,
  faEyeSlash,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import type { SignupType } from "../interfaces/auth/Signup";
import { signupUser } from "../services/authService";
import toast from "react-hot-toast";
import { handleError } from "../util/functions/errorHandler";
import type { Advantage } from "../interfaces/Advantage";

function Signup() {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const advantages: Advantage[] = [
    {
      icon: faCheck,
      advantage: "Free to join",
      description: "No hidden fees or subscription costs",
    },
    {
      icon: faCheck,
      advantage: "Instant Access",
      description: "Start browsing cars immediately after signup",
    },
    {
      icon: faCheck,
      advantage: "Seller Tools",
      description: "Easy listing creation and management",
    },
    {
      icon: faCheck,
      advantage: "Safe & Secure",
      description: "Your data is protected with enterprise-grade security",
    },
  ];
  const navigate = useNavigate();
  const signupForm = useFormik<SignupType>({
    initialValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be less than 15 characters")
        .required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "At least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      phoneNumber: Yup.string()
        .required("Phone number is required")
        .test("is-valid", "Phone number is invalid", (value) =>
          value ? isValidPhoneNumber(value) : false
        ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await signupUser(values);
        toast.success("user registered successfully");
        navigate("/signin");
      } catch (error) {
        handleError(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="grid lg:grid-cols-2 ">
      <aside className="hidden  top-0 left-0 sticky lg:flex justify-center items-center bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] h-screen">
        <div className="px-10 flex flex-col gap-10 text-white">
          <h2 className="font-bold text-4xl capitalize">start your journey</h2>
          <p className="text-xl">
            Join our community of car enthusiasts and find the perfect vehicle
            for your needs.
          </p>
          {advantages.map((adv, idx) => (
            <div className="flex items-center gap-3" key={idx}>
              <FontAwesomeIcon
                icon={adv.icon}
                className="p-3 text-lg bg-white/30 rounded-xl"
              />
              <div>
                <h3 className="text-lg font-semibold">{adv.advantage}</h3>
                <p className="text-sm">{adv.description}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="py-10">
        <div className="flex justify-between items-center gap-5 group w-fit mx-auto py-5">
          <Link
            to="/"
            className="font-bold capitalize text-2xl flex items-center gap-3"
          >
            <FontAwesomeIcon
              icon={faCarSide}
              className="p-4 text-2xl transition-colors duration-500 group-hover:bg-[var(--secondary-color)] bg-[var(--primary-color)] rounded-xl text-white"
            />
            autoMarket
          </Link>
        </div>

        <div className="mx-auto w-fit">
          <h1 className="font-bold text-3xl capitalize py-5 text-center">
            create account
          </h1>
          <p className="text-black/70">
            Join thousands of car enthusiasts today
          </p>
        </div>

        <div className="container py-10">
          <form
            onSubmit={signupForm.handleSubmit}
            className="flex flex-col gap-8"
          >
            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold capitalize text-black/70">
                username
              </label>
              <div className="relative">
                <input
                  name="username"
                  value={signupForm.values.username}
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  placeholder="John"
                  className="border px-10 py-3 rounded-xl border-black/30 w-full"
                />
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute top-4 left-3 text-lg opacity-50"
                />
              </div>
              {signupForm.touched.username && signupForm.errors.username && (
                <div className="text-red-500 text-sm">
                  {signupForm.errors.username}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold capitalize text-black/70">
                email address
              </label>
              <div className="relative">
                <input
                  name="email"
                  value={signupForm.values.email}
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  placeholder="John@example.com"
                  className="border px-10 py-3 rounded-xl border-black/30 w-full"
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute top-4 left-3 text-lg opacity-50"
                />
              </div>
              {signupForm.touched.email && signupForm.errors.email && (
                <div className="text-red-500 text-sm">
                  {signupForm.errors.email}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold capitalize text-black/70">
                phone number
              </label>
              <div className="relative">
                <PhoneInput
                  international
                  defaultCountry="EG"
                  value={signupForm.values.phoneNumber}
                  onChange={(value) =>
                    signupForm.setFieldValue("phoneNumber", value || "")
                  }
                  className="border px-10 py-3 rounded-xl border-black/30 w-full"
                />

                <FontAwesomeIcon
                  icon={faPhone}
                  className="absolute top-4 left-3 text-lg opacity-50"
                />
              </div>
              {signupForm.touched.phoneNumber &&
                signupForm.errors.phoneNumber && (
                  <div className="text-red-500 text-sm">
                    {signupForm.errors.phoneNumber}
                  </div>
                )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold capitalize text-black/70">
                password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={togglePassword ? "text" : "password"}
                  value={signupForm.values.password}
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  placeholder="Create a strong password"
                  className="border px-10 py-3 rounded-xl border-black/30 w-full"
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute top-4 left-3 text-lg opacity-50"
                />
                <FontAwesomeIcon
                  icon={togglePassword ? faEyeSlash : faEye}
                  onClick={() => setTogglePassword((prev) => !prev)}
                  className="absolute top-4 right-3 text-lg opacity-50 cursor-pointer"
                />
              </div>
              {signupForm.touched.password && signupForm.errors.password && (
                <div className="text-red-500 text-sm">
                  {signupForm.errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold capitalize text-black/70">
                confirm password
              </label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={toggleConfirmPassword ? "text" : "password"}
                  value={signupForm.values.confirmPassword}
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  placeholder="Confirm your password"
                  className="border px-10 py-3 rounded-xl border-black/30 w-full"
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute top-4 left-3 text-lg opacity-50"
                />
                <FontAwesomeIcon
                  icon={toggleConfirmPassword ? faEyeSlash : faEye}
                  onClick={() => setToggleConfirmPassword((prev) => !prev)}
                  className="absolute top-4 right-3 text-lg opacity-50 cursor-pointer"
                />
              </div>
              {signupForm.touched.confirmPassword &&
                signupForm.errors.confirmPassword && (
                  <div className="text-red-500 text-sm">
                    {signupForm.errors.confirmPassword}
                  </div>
                )}
            </div>

            <button
              type="submit"
              disabled={signupForm.isSubmitting}
              className="cursor-pointer transition-colors duration-300 hover:bg-[var(--secondary-color)] bg-[var(--primary-color)] text-white font-semibold text-xl px-7 py-3 rounded-xl capitalize"
            >
              create account
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Signup;
