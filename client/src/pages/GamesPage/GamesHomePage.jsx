import { useState, useEffect } from "react";

import { AuthState } from "../../context/AuthProvider";
import { Notify } from "../../utils";
import { Avatar, Box } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";

const GamesHomePage = () => {
  const [gamesData, setGamesData] = useState([]);

  const { auth } = AuthState();

  const fetchGameData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/game/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
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
      {auth.admin ? (
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          flexDirection={"column"}
        >
          {gamesData.map((game) => (
            <Button
              key={game._id}
              href={`/game/${game._id}`}
              variant="contained"
              style={{ margin: 32, border: '3px solid #e57373', borderRadius: 10, width: 300 }}
            >
              <Box
                display={"flex"}
                alignItems="center"
                justifyContent={"center"}
              >
                <Avatar src={game.image} style={{marginRight:32, width: 64, height: 64}}/> {game.name}
              </Box>
            </Button>
          ))}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default GamesHomePage;
