import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Stack,
  Link,
} from "@mui/material";
import { Upload } from "lucide-react";

interface Organization {
  companyName: string;
  companyLogo: File | null;
  companyEmail: string;
  employerName: string;
  password: string;
}

export default function OrganizationSignup() {
  const [organization, setOrganization] = useState<Organization>({
    companyName: "",
    companyLogo: null,
    companyEmail: "",
    employerName: "",
    password: "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setOrganization({ ...organization, companyLogo: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!organization.companyName)
      tempErrors.companyName = "Company Name is required";
    if (!organization.companyEmail)
      tempErrors.companyEmail = "Company Email is required";
    if (!organization.employerName)
      tempErrors.employerName = "Employer Name is required";
    if (!organization.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Organization Registered", organization);
    }
  };

  return (
    <center>
      <Container
        maxWidth="sm"
        sx={{
          p: 3,
          //   borderRadius: 2,
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom color="primary">
          Sign Up for Free – Streamline Your Hiring Process
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          Join AI interview and simplify your hiring journey. Easily assign
          interviews to candidates and make informed hiring decisions - all in
          one place!
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <input
              type="file"
              accept="image/*"
              id="upload-logo"
              hidden
              onChange={handleFileChange}
            />
            <label htmlFor="upload-logo">
              <Avatar
                src={logoPreview || "https://via.placeholder.com/100"}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  cursor: "pointer",
                  mx: "auto",
                }}
              />
              <Button
                component="span"
                variant="outlined"
                startIcon={<Upload />}
              >
                Upload Logo
              </Button>
            </label>

            <TextField
              fullWidth
              label="Company Name"
              variant="standard"
              value={organization.companyName}
              onChange={(e) =>
                setOrganization({
                  ...organization,
                  companyName: e.target.value,
                })
              }
              error={!!errors.companyName}
              helperText={errors.companyName}
            />

            <TextField
              fullWidth
              label="Company Email"
              variant="standard"
              value={organization.companyEmail}
              onChange={(e) =>
                setOrganization({
                  ...organization,
                  companyEmail: e.target.value,
                })
              }
              error={!!errors.companyEmail}
              helperText={errors.companyEmail}
            />

            {/* <TextField
              fullWidth
              label="Employer Name"
              variant="standard"
              value={organization.employerName}
              onChange={(e) =>
                setOrganization({
                  ...organization,
                  employerName: e.target.value,
                })
              }
              error={!!errors.employerName}
              helperText={errors.employerName}
            /> */}

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="standard"
              value={organization.password}
              onChange={(e) =>
                setOrganization({
                  ...organization,
                  password: e.target.value,
                })
              }
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Register
            </Button>

            <Typography variant="body2">
              <Link href="forgot-password">Forgot Password?</Link>
            </Typography>
            <Typography variant="body2">
              Already have an account? <Link href="signin">Login</Link>
            </Typography>
          </Stack>
        </Box>
      </Container>
    </center>
  );
}
