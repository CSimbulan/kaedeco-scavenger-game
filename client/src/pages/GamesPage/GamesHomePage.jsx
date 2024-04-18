import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthState } from "../../context/AuthProvider";
import { Notify } from "../../utils";
import {Box, Typography} from "@mui/material";
import React from "react";

const GamesHomePage = () => {
  const [privateMessage, setPrivateMessage] = useState("");

  const navigate = useNavigate();
  const { auth } = AuthState();

  const fetchPrivateDate = async () => {
    try {
      const response = await fetch("/api/private", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setPrivateMessage(data.data);
        return Notify(data.data, "success");
      } else {
        navigate("/login");
        return Notify("You are not authorized please login", "error");
      }
    } catch (error) {
      localStorage.removeItem("auth");
      navigate("/login");
      return Notify("Internal server error", "error");
    }
  };

  useEffect(() => {
    fetchPrivateDate();
    // eslint-disable-next-line
  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h3">{privateMessage}</Typography>
    </Box>
  );
};

export default GamesHomePage;
