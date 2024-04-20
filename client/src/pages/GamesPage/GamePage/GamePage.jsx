import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthState } from "../../../context/AuthProvider";
import { Notify } from "../../../utils";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  styled,
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

const GamePage = () => {
  const navigate = useNavigate();
  const { auth } = AuthState();

  const route = useParams();

  const [gameData, setGameData] = useState({
    name:"",
    image: "",
    startDate: null,
    endDate: null
  });
  const [stickerData, setStickerData] = useState([]);
  const [stickerInfoModalOpen, setStickerInfoModalOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState({});

  const handleStickerInfoModalClose = () => {
    setStickerInfoModalOpen(false);
  };

  const changeSelectedSticker = (sticker) => {
    setSelectedSticker(sticker);
    setStickerInfoModalOpen(true);
  };

  const fetchGameData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/game/${route.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();
      setGameData(data);
      const stickers = [];
      for (const sticker of data.stickers) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sticker/${sticker}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          });
          const data = await response.json();
          stickers.push(data);
        } catch (error) {
          return Notify("Internal server error", "error");
        }
      }
      setStickerData(stickers);
    } catch (error) {
      return Notify("Internal server error", "error");
    }
  };

  useEffect(() => {
    if (auth) {
      fetchGameData();
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
          p={2}
          pt={8}
          flexDirection="column"
        >
          <img src={gameData.image} alt="game profile" width="300" />
          <Typography variant="h4" style={{ marginBottom: 16 }}>
            {gameData.name}
          </Typography>
          <Typography style={{ marginBottom: 16 }}>
            {
              // @ts-ignore
              gameData.description
            }
          </Typography>
          <Typography>Start: {dayjs(gameData.startDate).toString()}</Typography>
          <Typography>End: {dayjs(gameData.endDate).toString()}</Typography>
          <Divider />
          <Box
            minHeight={300}
            border="1px solid gray"
            borderRadius={2}
            width={400}
            mt={2}
            mb={2}
          >
            <Grid container>
              {stickerData.map((sticker, index) => (
                <Grid item xs={4} key={index}>
                  {sticker.owners.includes(auth.id) || auth.admin ? (
                    <StickerOption
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      position="relative"
                      onClick={() => changeSelectedSticker(sticker)}
                    >
                      <Avatar
                        src={sticker.image}
                        style={{ width: 64, height: 64 }}
                      />
                      <Typography align="center">{sticker.name}</Typography>
                    </StickerOption>
                  ) : (
                    <Box
                      p={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      width="100%"
                    >
                      <Avatar
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Question-mark-grey.jpg/600px-Question-mark-grey.jpg"
                        style={{ width: 64, height: 64 }}
                      />
                      <Typography>?????</Typography>
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
          {stickerInfoModalOpen ? (
            <StickerInfoModal
              open={stickerInfoModalOpen}
              onClose={handleStickerInfoModalClose}
              sticker={selectedSticker}
            />
          ) : null}
        </Box>
      ) : (
        <Typography>Unauthorized</Typography>
      )}
    </>
  );
};

export default GamePage;
