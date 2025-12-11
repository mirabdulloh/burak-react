import React, { useEffect } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Badge } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE AND SELECTOR */
// Backend data → Component → dispatch() → Action → Reducer → Store → useSelector → UI
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

/** REDUX SLICE AND SELECTOR */
// Backend data → Component → dispatch() → Action → Reducer → Store → useSelector → UI
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);
  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-big-box">
            <span className="restaurant-name">Burak Restaurant</span>
            <Stack className="search-box">
              <input
                name="search"
                type="text"
                className="search-input"
                placeholder="Type here"
              />
              <Button
                variant="contained"
                color="primary"
                className="search-btn"
              >
                Search <SearchIcon />
              </Button>
            </Stack>
          </Stack>
          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button variant="contained" color="primary" className="order">
                New
              </Button>
              <Button variant="contained" color="secondary" className="order">
                Price
              </Button>
              <Button variant="contained" color="secondary" className="order">
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className="list-category-section">
            <Stack className="product-category">
              <div className="category-main">
                <Button
                  variant="contained"
                  color="primary"
                  className="product-category-order"
                >
                  Dish
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className="product-category-order"
                >
                  Salad
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className="product-category-order"
                >
                  Drink
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className="product-category-order"
                >
                  Dessert
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className="product-category-order"
                >
                  Other
                </Button>
              </div>
            </Stack>
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((products: Product) => {
                  const imgPath = `${serverApi}/${products.productImages[0]}`;
                  const sizeVolume =
                    products.productCollection === ProductCollection.DRINK
                      ? products.productVolume + " liter"
                      : products.productSize + " size";
                  return (
                    <Stack className="product-card" key={products._id}>
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imgPath})` }}
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        <Button className="shop-btn">
                          <img
                            src="/icons/shopping-cart.svg"
                            alt="#"
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className="view-btn">
                          <Badge badgeContent={products.productViews} color="secondary">
                            <RemoveRedEyeIcon
                              color="inherit"
                              sx={{
                                color: products.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {products.productName}
                        </span>
                        <div className="product-price-logo">
                          <MonetizationOnIcon className="product-price-dollor" />
                          <span className="product-price">{products.productPrice}</span>
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">No data available</Box>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Container>
          <Box className="brands-title">Our Family Brands</Box>
          <Stack className="brands-card-frame">
            <Stack className="brands-card">
              <img src="/img/sweets.webp" alt="#" className="brands-card-img" />
            </Stack>
            <Stack className="brands-card">
              <img src="/img/sweets.webp" alt="#" className="brands-card-img" />
            </Stack>
            <Stack className="brands-card">
              <img src="/img/sweets.webp" alt="#" className="brands-card-img" />
            </Stack>
            <Stack className="brands-card">
              <img src="/img/sweets.webp" alt="#" className="brands-card-img" />
            </Stack>
          </Stack>
        </Container>
      </div>
      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              style={{ marginTop: "80px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019568831713!2d-122.41941548468128!3d37.77492977975908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5d6f9fdf%3A0x7d7f8c6e32ed2d4a!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
              width="1300"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
