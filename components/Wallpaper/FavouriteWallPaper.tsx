"use client";
import React, { useState } from "react";
import Image from "next/image";

const FavouriteWallPaper = ({ item }: { item: string }) => {
  const [activeHovId, setActiveHovId] = useState("");

  return (
    <div
      className="shadow-lg rounded relative"
      onMouseOver={() => setActiveHovId(item)}
      onMouseOut={() => setActiveHovId("")}
    >
      <div
        className={`animate__animated ${
          activeHovId == item ? "show-overlay" : "hide-overlay"
        } `}
      >
        <div></div>
        <a
          href={item}
          download
          className="download-icon animate__animated animate__fadeInRight"
        >
          <i className="bx bx-download"></i>
        </a>
      </div>
      <div>
        <Image src={item} height={800} width={400} alt="image" />
      </div>
    </div>
  );
};

export default FavouriteWallPaper;
