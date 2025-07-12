import { faEnvelope, faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faArrowTrendUp,
  faCarSide,
  faEyeSlash,
  faLock,
  faShield,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import { signinUser } from "../services/authService";
import toast from "react-hot-toast";
import { handleError } from "../util/errorHandler";
import type { Advantage } from "../interfaces/Advantage";
import type { SigninType } from "../interfaces/auth/Signin";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignIn = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const advantages: Advantage[] = [
    {
      icon: faShield,
      advantage: "Free to join",
      description: "No hidden fees or subscription costs",
    },
    {
      icon: faUserGroup,
      advantage: "Instant Access",
      description: "Start browsing cars immediately after signup",
    },
    {
      icon: faArrowTrendUp,
      advantage: "Seller Tools",
      description: "Easy listing creation and management",
    },
  ];
  const signinForm = useFormik<SigninType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "At least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await signinUser(values);
        toast.success("user loged in successfully");
        console.log(response);
      } catch (error) {
        handleError(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="lg:grid lg:grid-cols-2 items-center">
      <section className="py-10 h-screen w-full flex justify-center items-center flex-col">
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
            welcome back
          </h1>
          <p className="text-black/70">
            Join thousands of car enthusiasts today
          </p>
        </div>

        <div className="container py-10">
          <form
            onSubmit={signinForm.handleSubmit}
            className="flex flex-col gap-8"
          >
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold capitalize text-black/70">
                email address
              </label>
              <div className="relative">
                <input
                  name="email"
                  value={signinForm.values.email}
                  onChange={signinForm.handleChange}
                  onBlur={signinForm.handleBlur}
                  placeholder="John@example.com"
                  className="border px-10 py-3 rounded-xl border-black/30 w-full"
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute top-4 left-3 text-lg opacity-50"
                />
              </div>
              {signinForm.touched.email && signinForm.errors.email && (
                <div className="text-red-500 text-sm">
                  {signinForm.errors.email}
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
                  autoComplete="true"
                  name="password"
                  type={togglePassword ? "text" : "password"}
                  value={signinForm.values.password}
                  onChange={signinForm.handleChange}
                  onBlur={signinForm.handleBlur}
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
              {signinForm.touched.password && signinForm.errors.password && (
                <div className="text-red-500 text-sm">
                  {signinForm.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={signinForm.isSubmitting}
              className="cursor-pointer transition-colors duration-300 hover:bg-[var(--secondary-color)] bg-[var(--primary-color)] text-white font-semibold text-xl px-7 py-3 rounded-xl capitalize"
            >
              sign in{" "}
              <FontAwesomeIcon icon={faArrowRight} className="ms-2 text-sm" />
            </button>
            <div className="flex justify-between gap-3 items-center text-black/50">
              <span className="border-t w-full"></span>
              <p className="text-nowrap capitalize text-sm">or continue with</p>
              <span className="border-t w-full"></span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <button
                type="button"
                className="w-full py-2 px-4 cursor-pointer bg-white border border-black/30 rounded-xl hover:bg-gray-300/30 transition-colors duration-300"
              >
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="text-red-500 me-3 text-xl"
                />
                Google
              </button>
              <button
                type="button"
                className="w-full py-2 px-4 cursor-pointer bg-white border border-black/30 rounded-xl hover:bg-gray-300/30 transition-colors duration-300"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-[#0866FF] me-3 text-xl"
                />
                Facebook
              </button>
            </div>
          </form>
        </div>
      </section>
      <aside className="hidden top-0 right-0 sticky lg:flex justify-center items-center bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] h-screen">
        <div className="px-10 flex flex-col gap-10 text-white">
          <h2 className="font-bold text-4xl capitalize">
            Find Your Perfect Car
          </h2>
          <p className="text-xl">
            Join thousands of satisfied customers who found their dream cars
            through our platform.
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
          <div className="p-3  bg-white/30 rounded-xl w-full text-center">
            <h4 className="text-orange-300 text-3xl font-bold">20,000+</h4>
            <p>cars sold successfully</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SignIn;
