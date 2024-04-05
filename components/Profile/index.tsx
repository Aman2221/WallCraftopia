"use client";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  const user_data = localStorage ? localStorage.getItem("user") : "";
  const user = localStorage && user_data ? JSON.parse(user_data as string) : "";

  return (
    <div className="flex justify-center items-center mt-200">
      <div className="bg-white max-w-2xl shadow-md overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Your profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details and informations about you.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.photoURL && user.photoURL.length ? (
                  <Image
                    src={user.photoURL}
                    height={80}
                    width={80}
                    alt="user image"
                  />
                ) : (
                  <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      {user.email.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                )}
              </dd>
            </div>
            {user.displayName ? (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.displayName}
                </dd>
              </div>
            ) : (
              <></>
            )}
            {user.displayName ? (
              <div className=" bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email verified
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.emailVerified.toString()}
                </dd>
              </div>
            ) : (
              <></>
            )}

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Unique ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.uid}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
