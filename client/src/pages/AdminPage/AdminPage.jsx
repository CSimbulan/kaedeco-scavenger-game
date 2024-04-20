import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthState } from "../../context/AuthProvider";
import { Notify } from "../../utils";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const AdminPage = () => {
  const [authorized, setAuthorized] = useState(false);

  const navigate = useNavigate();
  const { auth } = AuthState();

  const checkIfAuthorized = () => {
    if (auth.admin) {
        setAuthorized(true);
    }
    else {
        return Notify("You are not authorized the access this page", "error");
    }
  };

  useEffect(() => {
    checkIfAuthorized();
    // eslint-disable-next-line
  }, []);

  const onCreateNewGameButtonClick = () => {
    navigate("/admin/createnewgame")
  }

  return <>
  {authorized ? <Box width="100vw" display="flex" alignItems="center" justifyContent="center" pt={8} flexDirection="column">
    <Typography variant="h2">
      Welcome back, {auth.name}
    </Typography>
    <Button variant="contained" style={{margin: 32}} onClick={onCreateNewGameButtonClick}>
      Create New Game
    </Button>
    <Button variant="contained" style={{margin: 32}}>
      Edit Existing Game
    </Button>
    <Button variant="contained" style={{margin: 32}}>
      Add New Sticker
    </Button>
  </Box>: <Typography>
    Unauthorized</Typography>}
  </>;
};

export default AdminPage;
