import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";


/** REDUX SLICE AND SELECTOR */
// Backend data → Component → dispatch() → Action → Reducer → Store → useSelector → UI
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
});
export default function HomePage() {
  const { setPopularDishes, setNewDishes } = actionDispatch(useDispatch());
  
  // Selector: Store => DATA
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        productCollection: ProductCollection.DISH,
        order: "productViews",
      })
      .then((data) => {
        console.log("HomePage - getPopularDishes data:", data);
        setPopularDishes(data);
      })
      .catch((err) => {
        console.log("HomePage - getPopularDishes error:", err);
      });
      product
      .getProducts({
        page: 1,
        limit: 4,
        // productCollection: ProductCollection.DISH,
        order: "createdAt",
      })
      .then((data) => {
        console.log("HomePage - getPopularDishes data:", data);
        setNewDishes(data);
      })
      .catch((err) => {
        console.log("HomePage - getPopularDishes error:", err);
      });
  }, []);

  return (
    <div className="homepage">
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
