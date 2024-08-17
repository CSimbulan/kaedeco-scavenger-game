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

const MyGamesButton = styled(Button)(() => ({
  background: `linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 20px) calc(100% - 20px) no-repeat,
            linear-gradient(306deg, #82ea04 0%, #0bf333 20%, #0e7a24 42%, #245f0d 65%, #198418 83%, #18db3a 99%);`,
  boxSizing: "border-box",
  boxShadow: "15px 15px 10px 5px rgba(4,77,14,1)",
  borderRadius: 8,
  padding: 9,
  width: "100%",
  aspectRatio: "10/6 auto",
}));

const StickerBookButton = styled(Button)(() => ({
  background: `linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 20px) calc(100% - 20px) no-repeat,
            linear-gradient(306deg, #ea048b 0%, #f30b39 20%, #7a0e2a 42%, #5f0d22 65%, #841818 83%, #db1818 99%);`,
  boxSizing: "border-box",
  boxShadow: "15px 15px 10px 5px rgba(122,38,1,1);",
  borderRadius: 8,
  padding: 9,
  width: "100%",
  aspectRatio: "10/6 auto",
}));

const SettingsButton = styled(Button)(() => ({
  background: `linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 20px) calc(100% - 20px) no-repeat,
            linear-gradient(306deg, #04e0ea 0%, #0b6cf3 20%, #0e1b7a 42%, #0d0f5f 65%, #184f84 83%, #18c1db 99%);`,
  boxSizing: "border-box",
  boxShadow: "15px 15px 10px 5px rgba(6,5,77,1);",
  borderRadius: 8,
  padding: 9,
  width: "100%",
  aspectRatio: "10/6 auto",
}));

const OrganizationsButton = styled(Button)(() => ({
  background: `linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 20px) calc(100% - 20px) no-repeat,
            linear-gradient(306deg, #eae404 0%, #f3df0b 20%, #7a460e 42%, #5f530d 65%, #845d18 83%, #dbb218 99%);`,
  boxSizing: "border-box",
  boxShadow: "15px 15px 10px 5px rgba(77,60,5,1);",
  borderRadius: 8,
  padding: 9,
  width: "100%",
  aspectRatio: "10/6 auto",
}));

const ButtonBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 32,
}));

const HomePage = () => {
  const { auth } = AuthState();
  const theme = useTheme();
  const breakpointSmUp = useMediaQuery(theme.breakpoints.up("sm")); // Up is inclusive
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
    : "60%";

  const buttonFontSize = breakpointSmDown
    ? "h4"
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
            <Box>
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
                <MyGamesButton>
                  <ButtonBox
                    sx={{
                      backgroundImage: `url(${process.env.PUBLIC_URL}scavengerhunt.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Typography
                      variant={buttonFontSize}
                      color="white"
                      sx={{
                        textShadow:
                          "1px 0px 15px rgba(0,243,58,0.68), 1px 0px 25px rgba(0,243,58,0.68), 1px 0px 35px rgba(0,243,58,0.68), 1px 0px 45px rgba(0,243,58,0.68);",
                      }}
                    >
                      My Games
                    </Typography>
                  </ButtonBox>
                </MyGamesButton>
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
                <StickerBookButton>
                  <ButtonBox
                    sx={{
                      backgroundImage: `url(${process.env.PUBLIC_URL}stickerbook.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Typography
                      variant={buttonFontSize}
                      color="white"
                      sx={{
                        textShadow:
                          "1px 0px 15px rgba(243,0,0,0.68), 1px 0px 25px rgba(243,0,0,0.68), 1px 0px 35px rgba(243,0,0,0.68), 1px 0px 45px rgba(243,0,0,0.68);",
                      }}
                    >
                      Sticker Book
                    </Typography>
                  </ButtonBox>
                </StickerBookButton>
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
                <SettingsButton>
                  <ButtonBox
                    sx={{
                      backgroundImage: `url(${process.env.PUBLIC_URL}office.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Typography
                      variant={buttonFontSize}
                      color="white"
                      sx={{
                        textShadow:
                          "1px 0px 15px rgba(0,91,243,0.68), 1px 0px 25px rgba(0,91,243,0.68), 1px 0px 35px rgba(0,91,243,0.68), 1px 0px 45px rgba(0,91,243,0.68);",
                      }}
                    >
                      Account Settings
                    </Typography>
                  </ButtonBox>
                </SettingsButton>
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
                <OrganizationsButton>
                  <ButtonBox
                    sx={{
                      backgroundImage: `url(${process.env.PUBLIC_URL}construction.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Typography
                      variant={buttonFontSize}
                      color="white"
                      sx={{
                        textShadow:
                          "1px 0px 15px rgba(243,195,0,0.68), 1px 0px 25px rgba(243,195,0,0.68), 1px 0px 35px rgba(243,195,0,0.68), 1px 0px 45px rgba(243,195,0,0.68);",
                      }}
                    >
                      Organizations (Coming Soon)
                    </Typography>
                  </ButtonBox>
                </OrganizationsButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default HomePage;
