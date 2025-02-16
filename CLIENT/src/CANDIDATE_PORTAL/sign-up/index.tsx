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

interface Candidate {
  name: string;
  profile: File | null;
  email: string;
  password: string;
}

export default function CandidateSignup() {
  const [candidate, setCandidate] = useState<Candidate>({
    email: "",
    name: "",
    password: "",
    profile: null,
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setCandidate({ ...candidate, profile: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const Navigate = useNavigate();

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!candidate.name) tempErrors.companyName = "Name is required";
    if (!candidate.email) tempErrors.companyEmail = "Email is required";
    if (!candidate.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        const response = await register({
          name: candidate.name,
          email: candidate.email,
          password: candidate.password,
          role: "candidate",
        });
        if (response.success) {
          const { token, data } = response;
          setUser(data);
          Cookies.set("candidateToken", token);
          const loginInterval = setInterval(() => {
            console.log("running interval");
            if (Cookies.get("candidateToken")) {
              clearInterval(loginInterval);
              Navigate("/candidate/dashboard");
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
          Sign Up for Free – Simplify Your Hiring Journey
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          Sign up to access your interview details and stay updated on your
          hiring process.
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
              label="Name"
              variant="standard"
              value={candidate.name}
              onChange={(e) =>
                setCandidate({
                  ...candidate,
                  name: e.target.value,
                })
              }
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              fullWidth
              label="Email"
              variant="standard"
              value={candidate.email}
              onChange={(e) =>
                setCandidate({
                  ...candidate,
                  email: e.target.value,
                })
              }
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="standard"
              value={candidate.password}
              onChange={(e) =>
                setCandidate({
                  ...candidate,
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
              onClick={() => Navigate("/candidate/forgot-password")}
            >
              <Link variant="body2">Forgot Password?</Link>
            </div>
          </Typography>
          <Typography variant="body2">
            Already have an account?{" "}
            <div
              className="cursor-pointer"
              style={{ display: "inline-block" }}
              onClick={() => Navigate("/candidate/sign-in")}
            >
              <Link variant="body2">Sign in</Link>
            </div>
          </Typography>
        </Box>
      </Container>
    </center>
  );
}
