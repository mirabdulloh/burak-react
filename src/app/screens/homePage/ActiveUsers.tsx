import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider,Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
const activeUsers = [
  { memberNick: "Martin", memberImage: "/img/martin.webp" },
  { memberNick: "Justin", memberImage: "/img/justin.webp" },
  { memberNick: "Rose", memberImage: "/img/rose.webp" },
  { memberNick: "Nusret", memberImage: "/img/nusret.webp" },
];

export default function ActiveUsers() {
  return (
    <div className="homepage">
      <div className="active-user-frame">
        <Container>
          <Stack className="main">
            {/* Title */}
            <Box className="category-title">Active User</Box>

            <CssVarsProvider>
              <Stack className="cards-frame">
                {activeUsers.length !== 0 ? (
                  activeUsers.map((user, index) => (
                    <Box className="card" key={index}>
                      <img className="card-image" src={user.memberImage} alt="" />

                      <Box className="member-nickname">{user.memberNick}</Box>
                    </Box>
                  ))
                ) : (
                  <Box className="no-data">No Active Users!</Box>
                )}
              </Stack>
            </CssVarsProvider>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
