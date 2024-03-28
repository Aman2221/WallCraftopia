"use client";
import React, { useEffect, useState } from "react";
import { user_data } from "@/interfaces";
import { getUserFavourite } from "@/config/functions";
import FavouriteWallPaper from "../Wallpaper/FavouriteWallPaper";

const FavouritesPage = () => {
  const [data, setData] = useState<user_data>();

  const getData = async () => {
    const fav_data = await getUserFavourite();
    setData(fav_data as any);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container max-w-screen-xl mx-auto">
      {data?.favourites ? (
        <div className="flex flex-wrap gap-5">
          {data.favourites.map((item: string) => (
            <FavouriteWallPaper item={item} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-full mt-96">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
