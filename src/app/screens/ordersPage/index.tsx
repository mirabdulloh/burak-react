import React, { useEffect } from "react";
import { useState, SyntheticEvent } from "react";
import { Stack, Box, Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import FinishedOrders from "./FinishedOrders";
import ProcessOrders from "./ProcessOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";

import "../../../css/order.css";
import { Order, OrderInquiry } from "../../../lib/types/orders";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";

/** REDUX SLICE AND SELECTOR */
// Backend data → Component → dispatch() → Action → Reducer → Store → useSelector → UI
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setFinishedOrders, setProcessOrders } =
    actionDispatch(useDispatch());
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry]);

  /** HANDLERS **/
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box
                sx={{ borderBottom: 1, borderColor: "divider", width: "679px" }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table-list"
                >
                  <Tab label="PAUSED ORDER" value={"1"} />
                  <Tab label="PROCESS ORDER" value={"2"} />
                  <Tab label="FINISHED ORDER" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className="order-main-content">
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order-right">
          <Stack className="order-user-info">
            <Stack className="user-name">
              <Box className="member-box">
                <div className="order-user-img">
                  <img
                    src="/img/justin.webp"
                    alt="#"
                    className="order-user-avatar"
                  />
                  <div className="order-user-icon-box">
                    <img
                      src="/icons/user-badge.svg"
                      alt="#"
                      className="order-user-prof-img"
                    />
                  </div>
                </div>
                <div className="member-box-names">
                  <span className="order-user-name">Justin</span>
                  <span className="order-user-status">USER</span>
                </div>
              </Box>
            </Stack>
            <Stack className="user-name-bottom">
              <Box
                sx={{
                  borderTop: 2,
                  marginTop: "40px",
                  borderColor: "divider",
                  width: "332px",
                }}
              />
              <Box>
                <div className="user-name-bottom-location">
                  <LocationOnIcon />
                  <span className="location">South Korea, Busan</span>
                </div>
              </Box>
            </Stack>
          </Stack>
          <Stack className="order-user-pay">
            <Stack className="paying-system">
              <Box className="card-number">
                <input
                  type="text"
                  placeholder="Card number : 5243 4090 2002 7495"
                  id="card-number"
                  name="card-number"
                />
                <Stack className="card-date-cvv">
                  <input
                    type="date"
                    placeholder="07 / 24"
                    id="card-date"
                    name="card-date"
                  />
                  <input
                    type="number"
                    name="cvv-number"
                    id="cvv-number"
                    placeholder="CVV : 010"
                  />
                </Stack>
                <Box className="card-holder-name">
                  <input
                    type="text"
                    placeholder="Justin Robertson"
                    id="card-holder"
                    name="card-holder"
                  />
                </Box>
              </Box>
            </Stack>
            <Stack className="order-pay-cards">
              <Box className="cards">
                <img src="/icons/visa-card.svg" alt="" />
                <img src="/icons/visa-card.svg" alt="" />
                <img src="/icons/visa-card.svg" alt="" />
                <img src="/icons/visa-card.svg" alt="" />
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
