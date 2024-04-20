import { useState, useEffect } from "react";
// @ts-ignore
import { useNavigate, useParams, useRoutes } from "react-router-dom";

import { AuthState } from "../../context/AuthProvider";
import { Notify } from "../../utils";
import {
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";


const RedeemPage = () => {
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
      const stickerId = data._id;

      setStickerData(data);
      if (!data.owners.includes(auth.id)) {
        try {
          const response = await fetch(`/api/sticker/update/${stickerId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              owner: auth.id,
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
              // @ts-ignore
              stickerData.image
            }
            alt="game profile"
            width="300"
          />
          <Typography variant="h4">
            {
              // @ts-ignore
              stickerData.name
            }
          </Typography>
          <Typography>
            {
              // @ts-ignore
              stickerData.description
            }
          </Typography>
          <Typography>
            {
              // @ts-ignore
              stickerData._id
            }
          </Typography>
          <Typography>{auth.id}</Typography>

          <Divider />
          <Button
            variant="contained"
            onClick={() =>
              navigate(
                `/game/${
                  // @ts-ignore
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
