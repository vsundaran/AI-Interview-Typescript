import { Box, Stack, Typography } from "@mui/material";
import { APP_COLORS } from "../../theme/colors";
import Standing_Girl from "../../Assects/Images/Standing_Girl.jpg";

export default function Home() {
  return (
    <Box
      sx={{ width: "100%" }}
      // display={"flex"}
      // alignItems={"center"}
      // justifyContent={"center"}
      // gap={2}
    >
      {/* <Button variant="contained">Organisation</Button>
      <Button variant="outlined">Candidate</Button> */}

      <Box>
        <Stack spacing={1}>
          <Typography variant="h5" color={APP_COLORS.PRIMARY}>
            Welcome to Your AI Interview Companion
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Whether you're an organisation seeking top talent or a candidate
            aiming to ace your next interview, we've got you covered with
            AI-powered insights and seamless interview experiences.
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            position={"relative"}
          >
            <Box width={"100%"}>
              <Stack spacing={1}>
                <center>
                  <Typography variant="h6" color={APP_COLORS.PRIMARY}>
                    Organisation
                  </Typography>
                </center>
                <Typography variant="body1" color="text.secondary">
                  Share job descriptions effortlessly.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Generate interview links in seconds.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Answer accuracy
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Tone of voice analysis
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Eye contact performance
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Overall interview insights
                </Typography>
                <Typography variant="button" color={APP_COLORS.PRIMARY}>
                  Start Hiring Smarter →
                </Typography>
              </Stack>
            </Box>
            <img
              alt="standing_girl"
              src={Standing_Girl}
              style={{
                position: "absolute",
                width: "250px", // Set appropriate size
                height: "250px",
                borderRadius: "50%", // Circle shape
                objectFit: "cover", // Maintain aspect ratio, cover the area
                display: "block",
                margin: "0 auto", // Center the image horizontally
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <Box width={"100%"}>
              <Stack spacing={1}>
                <center>
                  <Typography variant="h6" color={APP_COLORS.PRIMARY}>
                    Candidates
                  </Typography>
                </center>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign={"end"}
                >
                  Share job descriptions effortlessly.
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign={"end"}
                >
                  Generate interview links in seconds.
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign={"end"}
                >
                  Answer accuracy
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign={"end"}
                >
                  Tone of voice analysis
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign={"end"}
                >
                  Eye contact performance
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign={"end"}
                >
                  Overall interview insights
                </Typography>
                <Typography
                  variant="button"
                  color={APP_COLORS.PRIMARY}
                  textAlign={"end"}
                >
                  ← Take Charge of Your Career
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ marginTop: "2rem !Important" }}>
            <Stack spacing={1}>
              <Typography variant="body1" color={APP_COLORS.PRIMARY}>
                Why Choose Us?
              </Typography>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant="h6">💡</Typography>
                <Typography variant="body1" color="text.secondary">
                  AI-Driven Performance Insights: Gain unmatched interview
                  analytics.
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant="h6">⚡</Typography>
                <Typography variant="body1" color="text.secondary">
                  Seamless Experience: Easy scheduling and participation for
                  both parties.
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant="h6"> 📊 </Typography>
                <Typography variant="body1" color="text.secondary">
                  Actionable Feedback: Improve with data-backed recommendations.
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Get started now and revolutionize your interview experience!
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
