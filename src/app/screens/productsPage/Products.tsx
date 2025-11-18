import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Badge } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  
  
];

export default function Products() {
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
                products.map((product, index) => {
                  return (
                    <Stack className="product-card" key={index}>
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${product.imagePath})` }}
                      >
                        <div className="product-sale"> Normal Size</div>
                        <Button className="shop-btn">
                          <img
                            src="/icons/shopping-cart.svg"
                            alt="#"
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className="view-btn" >
                          <Badge badgeContent={20} color="secondary">
                            <RemoveRedEyeIcon color="inherit" sx={{ color: 20>0 ? "gray" : "white", }} />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-price-logo">
                          <MonetizationOnIcon className="product-price-dollor"/>
                        <span className="product-price">12</span>
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
          <Stack className="pagination-section"></Stack>
        </Stack>
      </Container>

      <div className="brands-logo"></div>
      <div className="address"></div>
    </div>
  );
}
