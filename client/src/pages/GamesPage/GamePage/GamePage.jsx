import { useState, useEffect } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";

import { AuthState } from "../../../context/AuthProvider";
import { Notify } from "../../../utils";
import {
  Avatar,
  Box,
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

const GamePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { auth } = AuthState();

  const route = useParams();

  const [gameData, setGameData] = useState({});
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
      const response = await fetch(`/api/game/${route.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setGameData(data);
      const stickers = [];
      for (const sticker of data.stickers) {
        try {
          const response = await fetch(`/api/sticker/${sticker}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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
          pt={8}
          flexDirection="column"
        >
          <img src={gameData.image} alt="Game Picture" width="300" />
          <Typography variant="h4">{gameData.name}</Typography>
          <Typography>{gameData.description}</Typography>
          <Divider variant="middle" pt={3} />
          <Typography>Start: {dayjs(gameData.startDate).toString()}</Typography>
          <Typography>End: {dayjs(gameData.endDate).toString()}</Typography>
          <Divider />
          <Box
            minHeight={300}
            border="1px solid gray"
            borderRadius={2}
            width={400}
          >
            <Grid container>
              {stickerData.map((sticker, index) => (
                <Grid item sm={4} key={index}>
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
                      <Typography>{sticker.name}</Typography>
                    </StickerOption>
                  ) : (
                    <Box
                    p={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
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
