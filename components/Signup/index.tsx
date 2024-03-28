"use client";
import { auth, handleLoginWithGoogle } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { ErrorToast, SuccessToast, WarningToast } from "@/services/toast";
import { ToastContainer } from "react-toastify";

const SignUpPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let key = e.target.name;
    setUser({
      ...user,
      [key]: e.target.value,
    });
  };

  const handleSignUpWithEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.password == user.confirm_password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("user", JSON.stringify(user));
          SuccessToast("User logged in Successfully");
          redirect("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          ErrorToast(`${errorCode}, ${errorMessage}`);
        });
    } else {
      alert("Password and confirm password is not same");
    }
  };
  return (
    <>
      <section className="bg-gray-50">
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create and account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSignUpWithEmail}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={user.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm_password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm password
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={user.confirm_password}
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500">
                      I accept the{" "}
                      <Link
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="/terms-and-condition    "
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <button
                  onClick={handleLoginWithGoogle}
                  className="w-full text-white border hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center gap-2"
                >
                  <img
                    className="w-5 h-5"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span className="text-black">Sign in with Google</span>
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
