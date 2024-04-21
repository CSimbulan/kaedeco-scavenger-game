import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthState } from "../../../context/AuthProvider";
import { Notify } from "../../../utils";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import StickerInfoModal from "components/StickerInfoModal/StickerInfoModal";
import { red } from "@mui/material/colors";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(LocalizedFormat);

const StickerOption = styled(Box, {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gameColor",
  // @ts-ignore
})(({ theme, gameColor }) => ({
  padding: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
  zIndex: 3,
  "&:hover": {
    cursor: "pointer",
    backgroundColor: gameColor || theme.palette.grey[200],
  },
}));

const StickerViewButton = styled(Button, {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gameColor",
  // @ts-ignore
})(({ theme, gameColor }) => ({
  padding: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
  zIndex: 3,
  width: "50%",
  height: 40,
  borderColor: gameColor[100] ? gameColor[300] : theme.palette.info.main,
  color: "black",
  "@media (pointer:fine)": {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: gameColor[100] ? gameColor[300] : theme.palette.grey[200],
      borderColor: gameColor[100] ? gameColor[500] : theme.palette.info.dark,
    },
  },
  "&:disabled": {
    backgroundColor: gameColor[100] ? gameColor[300] : theme.palette.info.main,
    borderColor: gameColor[100] ? gameColor[500] : theme.palette.info.dark,
    color: "black",
  },
}));

const StickerContainer = styled(Box, {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gameColor",
  // @ts-ignore
})(({ theme, gameColor }) => ({
  minHeight: 300,
  border: `1px solid ${gameColor[100] ? gameColor[500] : "gray"}`,
  width: 400,
  margin: 16,
  boxShadow: `10px 10px ${
    gameColor[100] ? gameColor[300] : theme.palette.grey[500]
  }`,
}));

const HintBox = styled(Box, {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gameColor",
  // @ts-ignore
})(({ theme, gameColor }) => ({
  border: `1px solid ${gameColor[100] ? gameColor[500] : theme.palette.grey[300]}`,
  backgroundColor: gameColor[100] ? gameColor[200] : theme.palette.grey[300],
  borderRadius: 2,
  width: "80%",
  padding: 16,
  margin: 16,
  boxShadow: `10px 10px ${
    gameColor[100] ? gameColor[300] : theme.palette.grey[500]
  }`,
}));

const GamePage = () => {
  const navigate = useNavigate();
  const { auth } = AuthState();

  const route = useParams();

  const [gameData, setGameData] = useState({
    name: "",
    image: "",
    startDate: null,
    endDate: null,
    assets: {
      background: {
        image: "",
        color: "",
        shadow: "",
      },
      assets: [],
    },
  });
  const [stickerData, setStickerData] = useState([]);
  const [stickerInfoModalOpen, setStickerInfoModalOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState({});
  const [stickerView, setStickerView] = useState("stickers");
  const [themeColor, setThemeColor] = useState({});

  const theme = useTheme();
  const smallerScreens = useMediaQuery(theme.breakpoints.down("md"));
  const largerScreens = useMediaQuery(theme.breakpoints.up("lg"));

  const handleStickerInfoModalClose = () => {
    setStickerInfoModalOpen(false);
  };

  const changeSelectedSticker = (sticker) => {
    setSelectedSticker(sticker);
    setStickerInfoModalOpen(true);
  };

  const themeColorMap = {
    red: red,
  };

  const fetchGameData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/game/${route.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const data = await response.json();
      setGameData(data);
      if (data?.assets?.background.color) {
        setThemeColor(themeColorMap[data.assets.background.color]);
      }
      const stickers = [];
      for (const sticker of data.stickers) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/sticker/${sticker}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
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
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={2}
          pt={8}
          flexDirection="column"
          bgcolor={themeColor[100] || "white"}
          position="relative"
          zIndex={2}
        >
          {/*Assets for scavenger hunt theme*/}
          {gameData?.assets?.assets &&
            gameData.assets.assets.map((asset, index) => (
              <Box
                key={index}
                style={{
                  position: "fixed",
                  display: "flex",
                  ...(asset.horizontalPosition === "right" && {
                    right: 0,
                    justifyContent: "right",
                  }),
                  ...(asset.horizontalPosition === "left" && {
                    left: 0,
                    justifyContent: "left",
                  }),
                  ...(asset.verticalPosition === "top" && {
                    top: 70,
                    alignItems: "start",
                  }),
                  ...(asset.verticalPosition === "bottom" && {
                    bottom: "0%",
                    alignItems: "end",
                  }),
                  width: smallerScreens ? 300 : largerScreens ? 700 : 500,
                  height: smallerScreens ? 300 : largerScreens ? 700 : 500,
                  zIndex: -1,
                }}
              >
                <img src={asset.image} alt={`asset ${index}`} width="100%" height="100%"/>
              </Box>
            ))}
          {/*Scavenger hunt information*/}
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
          <Typography>
            Start:{" "}
            {dayjs(gameData.startDate).tz("America/Toronto").format("LLLL")}
          </Typography>
          <Typography>
            End: {dayjs(gameData.endDate).tz("America/Toronto").format("LLLL")}
          </Typography>
          <Divider />
          {/*View Selector*/}
          <Box width="300px" display="flex" mt={2}>
            <StickerViewButton
              // @ts-ignore
              gameColor={themeColor}
              variant="outlined"
              disabled={stickerView === "stickers"}
              onClick={() => setStickerView("stickers")}
            >
              Stickers
            </StickerViewButton>
            <StickerViewButton
              // @ts-ignore
              gameColor={themeColor}
              variant="outlined"
              disabled={stickerView === "hints"}
              onClick={() => setStickerView("hints")}
            >
              Hints
            </StickerViewButton>
          </Box>
          {stickerView === "stickers" && (
            <StickerContainer
              // @ts-ignore
              gameColor={themeColor}
            >
              <Grid container>
                {stickerData.map((sticker, index) => (
                  <Grid item xs={4} key={index}>
                    {sticker.owners.includes(auth.id) || auth.admin ? (
                      <StickerOption
                        // @ts-ignore
                        gameColor={themeColor[300] || theme.palette.grey[200]}
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
            </StickerContainer>
          )}
          {stickerView === "hints" && (
            <StickerContainer
              // @ts-ignore
              gameColor={themeColor}
            >
              <Box width="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column" py={2}> 
              {stickerData.map((sticker, index) => (
                  <HintBox
                    // @ts-ignore
                    gameColor={themeColor}
                    key={index}
                  >
                    <Typography variant="h5" align="center">
                      Hint #{index + 1}
                    </Typography>
                    <Typography>
                      {sticker.hints[0] || ''}
                    </Typography>
                  </HintBox>
              ))}
              </Box>
            </StickerContainer>
          )}
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
