import { useState, useEffect } from "react";

import { AuthState } from "../../../context/AuthProvider";
import { Notify } from "../../../utils";
import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const EditExistingGamePage = () => {
  const [gamesData, setGamesData] = useState([]);

  const { auth } = AuthState();
  const navigate = useNavigate();

  const fetchGameData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/game/${
          auth.admin ? "?admin=true" : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const data = await response.json();

      if (data) {
        // TODO: Non admins will see something different
        setGamesData(data);
      } else {
        return Notify("Error retrieving game data.", "error");
      }
    } catch (error) {
      return Notify("Internal server error", "error");
    }
  };

  useEffect(() => {
    fetchGameData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {auth && (
        <Box
          width="100vw"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          p={2}
        >
          <Button
            variant="contained"
            style={{ marginBottom: 32 }}
            onClick={() => navigate("/admin")}
          >
            <ArrowBack /> Return to Admin Page
          </Button>
          <Typography variant="h3">Edit Existing Game</Typography>
          {gamesData.map((game) => (
            <Button
              key={game._id}
              href={`/admin/editgame/${game._id}`}
              variant="outlined"
              style={{
                margin: 32,
                border: "3px solid #e57373",
                borderRadius: 10,
                width: 300,
                color: "black",
              }}
            >
              <Box
                display={"flex"}
                alignItems="center"
                justifyContent={"center"}
              >
                <Avatar
                  src={game.image}
                  style={{ marginRight: 32, width: 64, height: 64 }}
                />{" "}
                {game.name}
              </Box>
            </Button>
          ))}
        </Box>
      )}
    </>
  );
};

export default EditExistingGamePage;
