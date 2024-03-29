"use client";
import React, { useState, useEffect } from "react";
import wallData from "@/data/wallpapers.json";
import WallPaper from "../Wallpaper";
import { user_data, wall_paper } from "@/interfaces";
import {
  formateWallpaper,
  getUserFavourite,
  getWallpapers,
} from "@/config/functions";
import { InView } from "react-intersection-observer";
import Loader from "../Loader";

const HomePage = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [wallPapData, setWallPapData] = useState<wall_paper[]>([]);
  const [data, setData] = useState<user_data>();
  const [pageNumber, setPageNumber] = useState(1);

  const handleInView = (isView: boolean) => {
    setPageNumber(pageNumber + 1);
    getWallpapers(wallPapData, pageNumber);
    setShowLoader(false);
  };

  const getData = async () => {
    const fav_data = await getUserFavourite();
    setData(fav_data as any);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container max-w-screen-xl mx-auto mt-8">
      {wallPapData && wallPapData.length && (
        <div className="flex flex-wrap gap-5 xs:justify-center xl:justify-start">
          {wallPapData.map((item: wall_paper) => (
            <div key={item.url}>
              <WallPaper item={item} showFavOpt={true} data={data} />
            </div>
          ))}
        </div>
      )}

      <InView as="div" onChange={(inView) => handleInView(inView)}>
        <div
          className={`${
            wallPapData.length ? "mt-6" : "mt-80"
          } flex justify-center w-full`}
        >
          <Loader />
        </div>
      </InView>
    </div>
  );
};

export default HomePage;
