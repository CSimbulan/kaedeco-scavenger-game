import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { AuthState } from "../../context/AuthProvider";
import React from "react";
import { ContentCopy } from "@mui/icons-material";
import { SocialIcon } from "react-social-icons";

const StickerModal = ({ open, onClose, sticker }) => {

  const {auth} = AuthState();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{sticker.name}</DialogTitle>
      <DialogContent>
        <Box>
          <img src={sticker.image} width={200} alt="sticker"/>
          <Typography></Typography>
          <Typography>{sticker.description}</Typography>
          {auth.admin && <>
          <Typography variant="body2">Sticker ID: {sticker._id} <IconButton><ContentCopy onClick={() => {navigator.clipboard.writeText(sticker._id)}}/></IconButton>
            </Typography></>}
          <Divider style={{ backgroundColor: "black", margin: 16 }} flexItem />
          <Typography variant="body2">Artist: {sticker.artist.name}</Typography>
          <Box
            display="flex"
            justifyContent="left"
            alignItems={"start"}
            width="100%"
            flexDirection={"column"}
            mt={2}
          >
            {sticker.artist.socials.instagram && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="left"
                mb={2}
              >
                <SocialIcon
                  url={`https://www.instagram.com/${sticker.artist.socials.instagram}`}
                  style={{ height: 32, width: 32, marginRight: 16 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  network="instagram"
                />
                <Typography variant="body2">
                  {sticker.artist.socials.instagram}
                </Typography>
              </Box>
            )}
            {sticker.artist.socials.twitter && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="left"
                mb={2}
              >
                <SocialIcon
                  url={`https://www.x.com/${sticker.artist.socials.twitter}`}
                  style={{ height: 32, width: 32, marginRight: 16 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  network="twitter"
                />
                <Typography variant="body2">
                  {sticker.artist.socials.twitter}
                </Typography>
              </Box>
            )}
            {sticker.artist.socials.tiktok && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="left"
                mb={2}
              >
                <SocialIcon
                  url={`https://www.tiktok.com/${sticker.artist.socials.tiktok}`}
                  style={{ height: 32, width: 32, marginRight: 16 }}
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <Typography variant="body2">
                  {sticker.artist.socials.tiktok}
                </Typography>
              </Box>
            )}
            {sticker.artist.socials.twitch && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="left"
                mb={2}
              >
                <SocialIcon
                  url={`https://www.twitch.com/${sticker.artist.socials.twitch}`}
                  style={{ height: 32, width: 32, marginRight: 16 }}
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <Typography variant="body2">
                  {sticker.artist.socials.twitch}
                </Typography>
              </Box>
            )}
            {sticker.artist.socials.youtube && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="left"
                mb={2}
              >
                <SocialIcon
                  url={`https://www.youtube.com/channel/${sticker.artist.socials.youtube}`}
                  style={{ height: 32, width: 32, marginRight: 16 }}
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <Typography variant="body2">
                  {sticker.artist.socials.youtube}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StickerModal;
