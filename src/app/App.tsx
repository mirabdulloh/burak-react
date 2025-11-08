import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

function App() {
  
  return <Container maxWidth="sm">
    <Stack flexDirection={"column"}>
      <Box sx={{my:5}}>
        <Typography variant="h4" component={"h4"}>Create App with React MUI</Typography>
      </Box>
      <Button variant="contained">Contained</Button>
    </Stack>
  </Container>;
}

export default App;





