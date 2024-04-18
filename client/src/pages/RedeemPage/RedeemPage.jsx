import { useState, useEffect } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";

import { AuthState } from "../../context/AuthProvider";
import { Notify } from "../../utils";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import StickerInfoModal from "components/StickerInfoModal/StickerInfoModal";

const StickerOption = styled(Box)(({ theme }) => ({
  padding: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.grey[200],
  },
}));

const RedeemPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { auth } = AuthState();

  const route = useParams();

  const [stickerData, setStickerData] = useState({});


  const fetchStickerData = async () => {
    try {
      const response = await fetch(`/api/sticker/${route.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const stickerId = data._id
      const owners = data.owners
      setStickerData(data);
      if (!data.owners.includes(auth.id)) {
        try {
            console.log(stickerId)
            const temp = owners
            temp.push(auth.id)
            const response = await fetch(`/api/sticker/update/${stickerId}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                owners: temp
              }),
            });
            const data = await response.json();
    
            if (data.success) {
              Notify("Stick updated", "success");
            } else {
              return Notify(data.error, "warn");
            }
          } catch (error) {
            return Notify("Internal server error", "error");
          }
        };
    } catch (error) {
      return Notify("Internal server error", "error");
    }
  };

  useEffect(() => {
    if (auth) {
      fetchStickerData();
    } else {
      navigate("/");
      Notify("You are must log in to access this page", "error");
    }
  }, []);

  return (
    <>
      {auth ? (
        <Box
          width="100vw"
          display="flex"
          alignItems="center"
          justifyContent="center"
          pt={8}
          flexDirection="column"
        >
          <img src={stickerData.image} alt="Game Picture" width="300" />
          <Typography variant="h4">{stickerData.name}</Typography>
          <Typography>{stickerData.description}</Typography>
          <Typography>{stickerData._id}</Typography>
          <Typography>{auth.id}</Typography>
          
          <Divider />
          <Button variant="contained" onClick={()=>navigate(`/game/${stickerData.linkedGames[0]}`)}>View Sticker Book</Button>
        </Box>
      ) : (
        <Typography>Unauthorized</Typography>
      )}
    </>
  );
};

export default RedeemPage;
