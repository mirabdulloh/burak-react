import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/orders";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE AND SELECTOR */
// Backend data → Component → dispatch() → Action → Reducer → Store → useSelector → UI
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

export default function ProcessOrders() {
  const { processOrders } = useSelector(processOrdersRetriever);
  return (
    <TabPanel value="2">
      <Stack>
        {processOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order?.orderItems.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];

                  const imgPath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <Box className="dish-left">
                        <img src={imgPath} alt="#" className="order-dish-img" />
                        <p className="title-dish">{product.productName}</p>
                      </Box>
                      <Box className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" alt="#" />
                        <p>{item.itemQuantity}</p>
                        <img src="/icons/pause.svg" alt="#" />
                        <p style={{ marginLeft: "15px" }}>
                          {" "}
                          ${item.itemPrice * item.itemQuantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total-price-box">
                <Box className="box-total">
                  <p>product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img
                    src="/icons/plus.svg"
                    alt="#"
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src="/icons/pause.svg"
                    alt="#"
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <p className="date-confirmation">
                  {moment().format("YY.MM.DD HH-mm")}
                </p>
                <Button className="verify-button" variant="contained">
                  VERIFY TO FULFIL
                </Button>
              </Box>
            </Box>
          );
        })}
        {!processOrders ||
          (processOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src="/icons/noimage-list.svg"
                alt="#"
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
