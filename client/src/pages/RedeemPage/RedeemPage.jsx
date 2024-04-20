import { useState, useEffect } from "react";
// @ts-ignore
import { useNavigate, useParams } from "react-router-dom";

import { AuthState } from "../../context/AuthProvider";
import { Notify } from "../../utils";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";


const RedeemPage = () => {
  const navigate = useNavigate();
  const { auth } = AuthState();

  const route = useParams();

  const [stickerData, setStickerData] = useState({
    name: "",
    image: "",
    description: "",
    linkedGames: [],
    owners: [],
  });
  const [redeeming, setReedeming] = useState(true)

  const fetchStickerData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sticker/${route.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();
      const stickerId = data._id;
      const stickerOwned = data.owners.includes(auth.id)
      const gameId = data.linkedGames[0]
      setStickerData(data);
      setReedeming(!stickerOwned)
      if (!stickerOwned) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sticker/addowner/${stickerId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
              owner: auth.id,
              gameId: gameId
            }),
          });
          const updatedSitckerData = await response.json();
          setReedeming(false)
          if (updatedSitckerData.success) {
            Notify("Sticker updated", "success");          
          } else {
            return Notify(updatedSitckerData.error, "warn");
          }
        } catch (error) {
          return Notify("Internal server error", "error");
        }
      }
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
          <img
            src={
              stickerData.image
            }
            alt="game profile"
            width="300"
          />
          <Typography variant="h4" style={{marginBottom: 32}}>
            {
              stickerData.name
            }
          </Typography>
          <Typography  style={{marginBottom: 32}}>
            {
              stickerData.description
            }
          </Typography>
          {redeeming ? <>
            <Typography>Redeeming...</Typography>
            <CircularProgress  style={{marginBottom: 32}}/>
          </> : <Typography  style={{marginBottom: 32}}>You have redeemed this sticker.</Typography>}

          <Divider />
          <Button
            variant="contained"
            onClick={() =>
              navigate(
                `/game/${
                  stickerData.linkedGames[0]
                }`
              )
            }
          >
            View Sticker Book
          </Button>
        </Box>
      ) : (
        <Typography>Unauthorized</Typography>
      )}
    </>
  );
};

export default RedeemPage;
