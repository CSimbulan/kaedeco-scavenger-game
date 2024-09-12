import { AuthState } from "../../context/AuthProvider";
import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// @ts-ignore
const HomePageDivider = styled(Divider)(({ breakpointmdup }) => ({
  width: breakpointmdup === "true" ? "50%" : "100%",
  borderWidth: 8,
  borderRadius: 10,
  borderColor: "red",
  margin: 64,
}));
//`${process.env.PUBLIC_URL}treasuremap.jpg`

// @ts-ignore
const HomePageOptionButton = styled(Button)(({ breakpointsmdown }) => ({
  background: `linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - ${
    breakpointsmdown === "true" ? "13px" : "26px"
  }) calc(100% - ${breakpointsmdown === "true" ? "13px" : "26px"}) no-repeat,
            radial-gradient(at 100% 100%, rgba(254,93,93,1) 0%, transparent 70%),
            radial-gradient(at 100% 0%, rgba(248,143,249,1) 0%, transparent 70%),
            radial-gradient(at 0% 0%, rgba(254,93,93,1) 0%, transparent 70%),
            radial-gradient(at 0% 100%, rgba(248,143,249,1) 0%, rgba(248,143,249,0) 70%);`,
  boxSizing: "border-box",
  boxShadow: "15px 15px 10px 5px rgba(122,38,1,1)",
  borderRadius: 8,
  padding: 9,
  width: "100%",
  aspectRatio: "3/1 auto",
  transition: "all .2s ease-out",
  textTransform: "none",
  "&:hover": {
    transform: "translateY(4px)",
    boxShadow: "5px 5px 10px 5px rgba(122,38,1,1)",
    cursor: "pointer",
  },
}));

const ButtonBox2 = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "end",
  justifyContent: "space-between",
  padding: 4,
  overflow: "hidden",
}));

const HomePage = () => {
  const { auth } = AuthState();
  const theme = useTheme();
  //const breakpointSmUp = useMediaQuery(theme.breakpoints.up("sm")); // Up is inclusive
  const breakpointMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const breakpointSmDown = useMediaQuery(theme.breakpoints.down("sm")); // Down is exclsuive
  const breakpointMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const breakpointLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const breakpointXlDown = useMediaQuery(theme.breakpoints.down("xl"));

  const buttonWidth = breakpointSmDown
    ? "100%"
    : breakpointMdDown
    ? "100%"
    : breakpointLgDown
    ? "100%"
    : "65%";

  const buttonFontSize = breakpointSmDown
    ? "h5"
    : breakpointMdDown
    ? "h6"
    : breakpointXlDown
    ? "h4"
    : "h3";

  return (
    <>
      {auth && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          p={2}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
          >
            <Avatar
              src={auth.profilePic}
              alt="Profile image"
              style={{ width: 100, height: 100, marginRight: 32 }}
            />
            <Box display="flex" flexDirection="column" alignItems="start">
              <Typography variant="h4" align="center">
                Welcome back,
              </Typography>
              <Typography variant="h4" align="center" display={"inline"}>
                {auth.name}
              </Typography>
            </Box>
          </Box>
          <HomePageDivider
            variant="middle"
            // @ts-ignore
            breakpointmdup={breakpointMdUp.toString()}
          />
          <Grid container sx={{ width: buttonWidth }} mb={8}>
            <Grid
              item
              p={4}
              sm={6}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <HomePageOptionButton
                  // @ts-ignore
                  breakpointsmdown={breakpointXlDown.toString()}
                >
                  <ButtonBox2>
                    <Box height="100%" sx={{ aspectRatio: "1/1 auto" }}>
                      <img
                        src={`${process.env.PUBLIC_URL}pink-shapes.png`}
                        alt="pink-shapes"
                        width={"100%"}
                        height={"100%"}
                      />
                    </Box>
                    <Typography
                      variant={buttonFontSize}
                      color="rgba(254,93,93,1)"
                      mb={1}
                      mr={2}
                      sx={{
                        textShadow: `${
                          breakpointMdUp ? "1px 3px 0 #963336," : ""
                        } 1px 13px 5px #aba8a8`,
                        WebkitTextStroke: "1px #963336",
                      }}
                    >
                      Games
                    </Typography>
                  </ButtonBox2>
                </HomePageOptionButton>
              </Box>
            </Grid>
            <Grid
              item
              p={4}
              sm={6}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <HomePageOptionButton
                  // @ts-ignore
                  breakpointsmdown={breakpointXlDown.toString()}
                >
                  <ButtonBox2>
                    <Box height="100%" sx={{ aspectRatio: "1/1 auto" }}>
                      <img
                        src={`${process.env.PUBLIC_URL}pink-book.png`}
                        alt="pink-shapes"
                        width={"100%"}
                        height={"100%"}
                      />
                    </Box>
                    <Typography
                      variant={buttonFontSize}
                      color="rgba(254,93,93,1)"
                      mb={1}
                      mr={2}
                      sx={{
                        textShadow: `${
                          breakpointMdUp ? "1px 3px 0 #963336," : ""
                        } 1px 13px 5px #aba8a8`,
                        WebkitTextStroke: "1px #963336",
                      }}
                    >
                      Stickerbook
                    </Typography>
                  </ButtonBox2>
                </HomePageOptionButton>
              </Box>
            </Grid>
            <Grid
              item
              p={4}
              sm={6}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <HomePageOptionButton
                  // @ts-ignore
                  breakpointsmdown={breakpointXlDown.toString()}
                >
                  <ButtonBox2>
                    <Box height="100%" sx={{ aspectRatio: "1/1 auto" }}>
                      <img
                        src={`${process.env.PUBLIC_URL}pink-gear.png`}
                        alt="pink-shapes"
                        width={"100%"}
                        height={"100%"}
                      />
                    </Box>
                    <Typography
                      variant={buttonFontSize}
                      color="rgba(254,93,93,1)"
                      mb={1}
                      mr={2}
                      sx={{
                        textShadow: `${
                          breakpointMdUp ? "1px 3px 0 #963336," : ""
                        } 1px 13px 5px #aba8a8`,
                        WebkitTextStroke: "1px #963336",
                      }}
                    >
                      Account
                    </Typography>
                  </ButtonBox2>
                </HomePageOptionButton>
              </Box>
            </Grid>
            <Grid
              item
              p={4}
              sm={6}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <HomePageOptionButton
                  // @ts-ignore
                  breakpointsmdown={breakpointXlDown.toString()}
                >
                  <ButtonBox2>
                    <Box height="100%" sx={{ aspectRatio: "1/1 auto" }}>
                      <img
                        src={`${process.env.PUBLIC_URL}pink-castle.png`}
                        alt="pink-shapes"
                        width={"100%"}
                        height={"100%"}
                      />
                    </Box>
                    <Typography
                      variant={buttonFontSize}
                      color="rgba(254,93,93,1)"
                      mb={1}
                      mr={2}
                      sx={{
                        textShadow: `${
                          breakpointMdUp ? "1px 3px 0 #963336," : ""
                        } 1px 13px 5px #aba8a8`,
                        WebkitTextStroke: "1px #963336",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Organizations
                    </Typography>
                  </ButtonBox2>
                </HomePageOptionButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default HomePage;
