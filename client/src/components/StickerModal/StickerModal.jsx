import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormGroup,
  Grid,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { AuthState } from "../../context/AuthProvider";
import React, { useEffect, useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { Notify } from "../../utils";

const TabButton = styled(Button)(({ theme }) => ({
  width: "50%",
  "&:disabled": {
    backgroundColor: theme.palette.info.main,
    color: "white",
  },
}));

const StickerOption = styled(Box, {
    // @ts-ignore
    shouldForwardProp: (prop) => prop !== 'selected' })(({ theme, selected }) => ({
    padding: 2,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
    backgroundColor: selected ? theme.palette.info.dark : theme.palette.common.white,
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: !selected && theme.palette.grey[200] 
      },
}));

const StickerModal = ({ open, onClose, onSelectSticker, selectedStickers }) => {
  const { auth } = AuthState();
  const [useExistingSticker, setUseExistingSticker] = useState(true);
  const [selectedSticker, setSelectedSticker] = useState({});
  const [stickerName, setStickerName] = useState("");
  const [description, setDescription] = useState("");
  //const [hints, setHints] = useState([])
  const [imageUrl, setImageUrl] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artistInstagram, setArtistInstagram] = useState("");
  const [artistTwitter, setArtistTwitter] = useState("");
  const [artistYoutube, setArtistYoutube] = useState("");
  const [artistTwitch, setArtistTwitch] = useState("");
  const [artistTiktok, setArtistTiktok] = useState("");

  const [stickerData, setStickerData] = useState([]);

  const theme = useTheme();

  const onStickerNameChange = (e) => {
    setStickerName(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const onArtistNameChange = (e) => {
    setArtistName(e.target.value);
  };

  const onArtistInstagramChange = (e) => {
    setArtistInstagram(e.target.value);
  };

  const onArtistTwitterChange = (e) => {
    setArtistTwitter(e.target.value);
  };

  const onArtistYoutubeChange = (e) => {
    setArtistYoutube(e.target.value);
  };

  const onArtistTwitchChange = (e) => {
    setArtistTwitch(e.target.value);
  };

  const onArtistTiktokChange = (e) => {
    setArtistTiktok(e.target.value);
  };

  const handleCreateNewSticker = async (e) => {
    e.preventDefault();

    // If any field is missing
    if (!stickerName || !imageUrl) {
      return Notify("Please Fill all the Fields", "warn");
    }

    try {
      const response = await fetch("/api/sticker/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: stickerName,
          description: description,
          image: imageUrl,
          artist: {
            name: artistName,
            socials: {
              instagram: artistInstagram,
              twitter: artistTwitch,
              tiktok: artistTiktok,
              twitch: artistTwitch,
              youtube: artistYoutube,
            },
          },
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSelectedSticker(data);
        onSelectSticker({
          id: data.id,
          name: data.name,
          image: data.image,
        });
        return Notify("Sticker", "success");
      } else {
        return Notify(data.error, "warn");
      }
    } catch (error) {
      return Notify("Internal server error", "error");
    }
  };

  const fetchStickerData = async () => {
    try {
      const response = await fetch("/api/sticker/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();

      if (data) {
        // Filter the data for stickers that are not already selected for the game.
        const temp1 = selectedStickers.map(s => s.id);
        setStickerData(data.filter(sticker => !temp1.includes(sticker._id)));
      } else {
        return Notify("Error retrieving sticker data.", "error");
      }
    } catch (error) {
      return Notify("Internal server error", "error");
    }
  };

  useEffect(() => {
    // Get existing stickers
    fetchStickerData();
  }, []);

  const changeSelectedSticker = (sticker) => {
    setSelectedSticker({
        name: sticker.name,
        id: sticker._id,
        image: sticker.image
    })
  }


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add sticker</DialogTitle>
      <DialogContent>
        <Box>
          <TabButton
            variant="outlined"
            disabled={useExistingSticker}
            onClick={() => setUseExistingSticker(true)}
          >
            Existing Sticker
          </TabButton>
          <TabButton
            variant="outlined"
            disabled={!useExistingSticker}
            onClick={() => setUseExistingSticker(false)}
          >
            New Sticker
          </TabButton>
        </Box>
        <Divider />
        <Box mt={2}>
          {useExistingSticker ? (
            <Box minHeight={300} border="1px solid gray" borderRadius={2} p={2}>
              <Grid container>
              {stickerData.map((sticker, index) => (
                <Grid item xs={4} key={sticker.id}>
                  <StickerOption 
                  // @ts-ignore
                  selected={sticker._id === selectedSticker.id}
                  onClick={() => changeSelectedSticker(sticker)}>
                    <Avatar sizes="sm" src={sticker.image} />
                    <Typography textAlign="center">{sticker.name}</Typography>
                  </StickerOption>
                </Grid>
              ))}
              </Grid>
            </Box>
          ) : (
            <Box>
              <FormGroup>
                <TextField
                  required
                  variant="outlined"
                  label="Sticker Name"
                  style={{ marginBottom: 16 }}
                  value={stickerName}
                  onChange={onStickerNameChange}
                />
                <TextField
                  variant="outlined"
                  label="Description"
                  style={{ marginBottom: 16 }}
                  value={description}
                  onChange={onDescriptionChange}
                />
                <TextField
                  required
                  variant="outlined"
                  label="Image Url"
                  style={{ marginBottom: 16 }}
                  value={imageUrl}
                  onChange={onImageUrlChange}
                />
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>Show Artist Information</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box display="flex" flexDirection="column">
                      <TextField
                        variant="outlined"
                        label="Artist Name"
                        style={{ marginBottom: 16 }}
                        value={artistName}
                        onChange={onArtistNameChange}
                      />
                      <TextField
                        variant="outlined"
                        label="Artist Instagram"
                        style={{ marginBottom: 16 }}
                        value={artistInstagram}
                        onChange={onArtistInstagramChange}
                      />
                      <TextField
                        variant="outlined"
                        label="Artist Twitter"
                        style={{ marginBottom: 16 }}
                        value={artistTwitter}
                        onChange={onArtistTwitterChange}
                      />
                      <TextField
                        variant="outlined"
                        label="Artist Tiktok"
                        style={{ marginBottom: 16 }}
                        value={artistTiktok}
                        onChange={onArtistTiktokChange}
                      />
                      <TextField
                        variant="outlined"
                        label="Artist Twitch"
                        style={{ marginBottom: 16 }}
                        value={artistTwitch}
                        onChange={onArtistTwitchChange}
                      />
                      <TextField
                        variant="outlined"
                        label="Artist Youtube"
                        style={{ marginBottom: 16 }}
                        value={artistYoutube}
                        onChange={onArtistYoutubeChange}
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </FormGroup>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type={useExistingSticker ? "button" : "submit"}
          onClick={
            useExistingSticker
              ? () => onSelectSticker(selectedSticker)
              : handleCreateNewSticker
          }
        >
          Add Sticker
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StickerModal;
