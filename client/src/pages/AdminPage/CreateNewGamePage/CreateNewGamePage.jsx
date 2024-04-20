import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthState } from "../../../context/AuthProvider";
import { Notify } from "../../../utils";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Add, ArrowBack, Close } from "@mui/icons-material";
import StickerModal from "components/StickerModal/StickerModal";

const CreateNewGamePage = () => {
  const [authorized, setAuthorized] = useState(false);
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(7, "hours"));
  const [stickers, setStickers] = useState([]);
  const [sequential, setSequential] = useState(false);
  const [addStickerModalOpen, setAddStickerModalOpen] = useState(false);

  const onGameNameChange = (e) => {
    setGameName(e.target.value);
  };

  const onGameDescriptionChange = (e) => {
    setGameDescription(e.target.value);
  };

  const onImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const onSequentialChange = (e) => {
    setSequential(e.target.value);
  };

  const onStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const onEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleAddStickerModalClose = () => {
    setAddStickerModalOpen(false);
  };

  const removeSticker = (index) => {
    const temp = [...stickers];
    temp.splice(index, 1);
    setStickers(temp);
  };

  const handleSelectedSticker = (sticker) => {
    const temp = [...stickers];
    temp.push(sticker);
    setStickers(temp);
    setAddStickerModalOpen(false);
  };

  const theme = useTheme();
  const navigate = useNavigate();
  const { auth } = AuthState();
  const breakpointSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const checkIfAuthorized = () => {
    if (auth.admin) {
      setAuthorized(true);
    } else {
      return Notify("You are not authorized the access this page", "error");
    }
  };

  useEffect(() => {
    checkIfAuthorized();
    // eslint-disable-next-line
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    // If any field is missing
    if (!gameName) {
      return Notify("Game name required", "warn");
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/game/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: gameName,
          description: gameDescription,
          image: imageUrl,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          sequential,
          stickers: stickers.map((sticker) => sticker.id),
        }),
      });
      const data = await response.json();
      const gameId = data.id;
      if (data.success) {
        Notify("Game created", "success");
        try {
          for (const sticker of stickers) {
            // @ts-ignore
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sticker/update/${sticker.id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                linkedGames: [gameId],
              }),
            });
            const data = await response.json();
            if (data.success) {
              return Notify("Sticker updated", "success");
            } else {
              return Notify(data.error, "warn");
            }
          }
        } catch {}
      } else {
        return Notify(data.error, "warn");
      }
    } catch (error) {
      return Notify("Internal server error", "error");
    }
  };

  return (
    <>
      {authorized ? (
        <Box
          width="100vw"
          display="flex"
          alignItems="center"
          justifyContent="center"
          pt={8}
          flexDirection="column"
        >
          <Button
            variant="contained"
            style={{ marginBottom: 32 }}
            onClick={() => navigate("/admin")}
          >
            <ArrowBack /> Return to Admin Page
          </Button>
          <Typography variant="h3">Create a New Game</Typography>

          <FormGroup>
            <TextField
              variant="outlined"
              label="Game Name"
              style={{ margin: 32 }}
              value={gameName}
              onChange={onGameNameChange}
            />

            <TextField
              variant="outlined"
              multiline
              minRows={4}
              label="Description"
              style={{ marginBottom: 32 }}
              value={gameDescription}
              onChange={onGameDescriptionChange}
            />

            <TextField
              variant="outlined"
              label="Image Url"
              style={{ margin: 32 }}
              value={imageUrl}
              onChange={onImageUrlChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box mb={4}>
                <DateTimePicker
                  label="Start Date & Time"
                  onChange={(newValue) => onStartDateChange(newValue)}
                  value={startDate}
                />
              </Box>
              <Box mb={2}>
                <DateTimePicker
                  label="End Date & Time"
                  onChange={(newValue) => onEndDateChange(newValue)}
                  defaultValue={dayjs().add(7, "hours")}
                />
              </Box>
            </LocalizationProvider>

            <Box mb={2}>
              <FormControlLabel
                control={
                  <Checkbox value={sequential} onChange={onSequentialChange} />
                }
                label="Sequential"
                labelPlacement="start"
              />
            </Box>

            <Box
              minHeight={300}
              border="1px solid gray"
              borderRadius={2}
              width={breakpointSmUp ? 500 : "100vw"}
            >
              <Grid container>
                {stickers.map((sticker, index) => (
                  <Grid item sm={4} key={sticker.id}>
                    <Box
                      p={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      position="relative"
                    >
                      <Avatar sizes="sm" src={sticker.image} />
                      <Typography>{sticker.name}</Typography>
                      <IconButton
                        onClick={() => removeSticker(index)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                      >
                        <Close />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
                <Grid item sm={4}>
                  <Box
                    p={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <IconButton
                      onClick={() => setAddStickerModalOpen(true)}
                      style={{ backgroundColor: theme.palette.primary.main }}
                    >
                      <Add />
                    </IconButton>
                    <Typography>Add sticker</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Button
              variant="contained"
              style={{ margin: 32 }}
              type="submit"
              onClick={onSubmit}
            >
              Create Game
            </Button>
          </FormGroup>
          {addStickerModalOpen ? (
            <StickerModal
              open={addStickerModalOpen}
              onClose={handleAddStickerModalClose}
              onSelectSticker={handleSelectedSticker}
              selectedStickers={stickers}
            />
          ) : null}
        </Box>
      ) : (
        <Typography>Unauthorized</Typography>
      )}
    </>
  );
};

export default CreateNewGamePage;
