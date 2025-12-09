import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE AND SELECTOR */
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="homepage">
      <div className="active-user-frame">
        <Container>
          <Stack className="main">
            <Box className="category-title">Active User</Box>

            <CssVarsProvider>
              <Stack className="cards-frame">
                {topUsers.length !== 0 ? (
                  topUsers.map((member) => {
                    const imgPath = `${serverApi}/${member.memberImg}`;

                    return (
                      <Box className="card" key={member._id}>
                        <img className="card-image" src={imgPath} alt="" />

                        <Box className="member-nickname">
                          {member.memberNick}
                        </Box>
                      </Box>
                    );
                  })
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
