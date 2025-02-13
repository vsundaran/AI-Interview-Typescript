import { useState } from "react";
import {
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

type ProfileSectionProps = {
  organisation?: boolean;
  candidate?: boolean;
};

const ProfileSection = ({ organisation, candidate }: ProfileSectionProps) => {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [organisationName, setOrganisationName] = useState("JEO SOFT TECH");
  const [jobRole, setJobRole] = useState("Frontend Developer");
  //eslint-disable-next-line
  const [attendedInterviews, setAttendedInterviews] = useState(12);
  //eslint-disable-next-line
  const [interviewScore, setInterviewScore] = useState(85);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <CardContent>
      <Stack spacing={2} alignItems="center">
        <label htmlFor="upload-image">
          <input
            type="file"
            id="upload-image"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
          <Avatar
            src={image}
            sx={{
              width: 100,
              height: 100,
              cursor: "pointer",
              border: "2px solid #ccc",
            }}
          />
        </label>
        <Typography variant="h6">Profile Information</Typography>
        <TextField
          variant="standard"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="standard"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {organisation ? (
          <Stack spacing={2} alignItems="center" width={"100%"}>
            <TextField
              variant="standard"
              label="Organisation Name"
              fullWidth
              value={organisationName}
              onChange={(e) => setOrganisationName(e.target.value)}
            />
            <TextField
              variant="standard"
              label="Candidates Count"
              fullWidth
              disabled
              value={10}
            />
          </Stack>
        ) : null}

        {candidate ? (
          <Stack spacing={2} alignItems="center" width={"100%"}>
            <TextField
              variant="standard"
              label="Job Role"
              fullWidth
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
            <TextField
              variant="standard"
              label="Attended Interviews"
              fullWidth
              value={attendedInterviews}
              disabled
            />
            <TextField
              variant="standard"
              label="Overall Score"
              fullWidth
              value={interviewScore}
              disabled
            />
          </Stack>
        ) : null}

        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Stack>
    </CardContent>
  );
};

export default ProfileSection;
