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
  import { ExpandMore, Instagram } from "@mui/icons-material";
  import { Notify } from "../../utils";
  
  const StickerModal = ({ open, onClose, sticker }) => {
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{sticker.name}</DialogTitle>
        <DialogContent>
          <Box>
            <img src={sticker.image} width={200}/>
            <Typography></Typography>
            <Typography>{sticker.description}</Typography>
            <Divider style={{backgroundColor: 'black', margin: 16}} flexItem/>
            <Typography variant="body2">Artist: {sticker.artist.name}</Typography>
            <Box display="flex" justifyContent={"left"} alignItems={"center"} width="100%">
                <Instagram style={{marginRight: 16}}/> <Typography variant="body2">@sirkdawg</Typography>
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
  