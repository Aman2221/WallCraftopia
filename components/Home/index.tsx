"use client";
import React, { useState, useEffect } from "react";
import wallData from "@/data/wallpapers.json";
import WallPaper from "../Wallpaper";
import { user_data, wall_paper } from "@/interfaces";
import { getUserFavourite } from "@/config/functions";

const HomePage = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [data, setData] = useState<user_data>();

  const getData = async () => {
    const fav_data = await getUserFavourite();
    setData(fav_data as any);
    setShowLoader(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container max-w-screen-xl mx-auto">
      {showLoader ? (
        <div className="flex justify-center w-full mt-96">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 xs:justify-center xl:justify-start">
          {wallData.map((item: wall_paper) => (
            <div key={item.url}>
              <WallPaper item={item} showFavOpt={true} data={data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
