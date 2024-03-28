import FavouritesPage from "@/components/Favourites";
import Layout from "@/components/Layout";
import React from "react";

const Favourites = () => {
  return <Layout children={<FavouritesPage />} />;
};

export default Favourites;
