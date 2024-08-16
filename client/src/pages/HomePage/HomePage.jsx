import { useState, useEffect } from "react";

import { AuthState } from "../../context/AuthProvider";
import { Notify } from "../../utils";
import React from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_GAMES_BY_USER } from "graphql/queries/game/getGamesByUserQuery";

const HomePage = () => {
  const [gamesData, setGamesData] = useState([]);

  const { auth } = AuthState();

  const { data, loading } = useQuery(GET_GAMES_BY_USER, {
    variables: {
      input: auth.id,
    },
  });

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
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Avatar
                src={auth.profilePic}
                alt="Profile image"
                style={{ width: 100, height: 100, margin: 32 }}
              />
              <Typography variant="h4" align="center">
                Welcome back, {auth.name}
              </Typography>
              {data.gamesByUser.map((game) => (
                <Button
                  key={game._id}
                  href={`/game/${game._id}`}
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
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default HomePage;
