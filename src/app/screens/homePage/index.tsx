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
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";


/** REDUX SLICE AND SELECTOR */
// Backend data → Component → dispatch() → Action → Reducer → Store → useSelector → UI
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});
export default function HomePage() {
  const { setPopularDishes, setNewDishes,setTopUsers } = actionDispatch(useDispatch());
  
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

      const member = new MemberService();
      member
      .getTopUsers()
      .then((data) => {
        console.log("HomePage - getTopUsers data:", data);
        setTopUsers(data);
      })
      .catch((err) => {
        console.log("HomePage - getTopUsers error:", err);
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
