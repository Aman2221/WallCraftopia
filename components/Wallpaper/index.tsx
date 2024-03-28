"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { user_data, wall_paper } from "@/interfaces";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { ErrorToast, SuccessToast } from "@/services/toast";
const WallPaper = ({
  item,
  showFavOpt,
  data,
}: {
  item: wall_paper;
  showFavOpt: boolean;
  data?: user_data;
}) => {
  const [activeHovId, setActiveHovId] = useState("");

  const addToFavourite = async (URL: string) => {
    const uid = JSON.parse(localStorage.getItem("user") as string)?.uid;
    console.log("uid", uid);
    try {
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, {
        favourites: arrayUnion(URL),
      })
        .then(() => SuccessToast("Wallpaper added to favourites"))
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          ErrorToast(`${errorCode}, ${errorMessage}`);
        });
    } catch (e) {
      console.log("Error in addUserToDb", e);
    }
  };

  return (
    <div
      className="shadow-lg rounded relative"
      onMouseOver={() => setActiveHovId(item.id)}
      onMouseOut={() => setActiveHovId("")}
    >
      <div
        className={`animate__animated ${
          activeHovId == item.id ? "show-overlay" : "hide-overlay"
        } `}
      >
        {showFavOpt ? (
          <div className="favourite-icon animate__animated animate__fadeInLeft">
            {data?.favourites.includes(item.url) ? (
              <i className="bx bxs-heart"></i>
            ) : (
              <i
                onClick={() => addToFavourite(item.url)}
                className="bx bx-heart"
              ></i>
            )}
          </div>
        ) : (
          <div></div>
        )}

        <a
          href={item.url}
          download
          className="download-icon animate__animated animate__fadeInRight"
        >
          <i className="bx bx-download"></i>
        </a>
      </div>
      <div>
        <Image src={item.url} height={800} width={400} alt="image" />
      </div>
    </div>
  );
};

export default WallPaper;
