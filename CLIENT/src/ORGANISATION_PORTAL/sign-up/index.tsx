import { FormEvent, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { register } from "../../services/API/routes/common";
import Cookies from "js-cookie";
import { returnErrorMessage } from "../../components/elementes/error";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "../../context/AuthContext";

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
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setOrganization({ ...organization, companyLogo: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const Navigate = useNavigate();

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!organization.companyName)
      tempErrors.companyName = "Company Name is required";
    if (!organization.companyEmail)
      tempErrors.companyEmail = "Company Email is required";
    if (!organization.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        const response = await register({
          name: organization.companyName,
          email: organization.companyEmail,
          password: organization.password,
          role: "organisation",
        });
        if (response.success) {
          const { token, user } = response;
          setUser(user);
          Cookies.set("organisationToken", token, { expires: 30 });
          const loginInterval = setInterval(() => {
            console.log("running interval");
            if (Cookies.get("organisationToken")) {
              clearInterval(loginInterval);
              Navigate("/organisation/dashboard");
            }
          }, 100);
        }
      } catch (err) {
        const errorMessage = returnErrorMessage(err);
        enqueueSnackbar(errorMessage, { variant: "error" });
      } finally {
        setLoading(false);
      }
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
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
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
              type="submit"
              loading={loading}
              fullWidth
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </Stack>
          <Typography variant="body2" sx={{ marginY: 1 }}>
            <div
              className="cursor-pointer"
              style={{ display: "inline-block" }}
              onClick={() => Navigate("/organisation/forgot-password")}
            >
              <Link variant="body2">Forgot Password?</Link>
            </div>
          </Typography>
          <Typography variant="body2">
            Already have an account?{" "}
            <div
              className="cursor-pointer"
              style={{ display: "inline-block" }}
              onClick={() => Navigate("/organisation/sign-in")}
            >
              <Link variant="body2">Sign in</Link>
            </div>
          </Typography>
        </Box>
      </Container>
    </center>
  );
}
