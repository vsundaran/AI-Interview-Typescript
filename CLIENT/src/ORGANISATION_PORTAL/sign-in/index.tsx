import { FormEvent, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import { returnErrorMessage } from "../../components/elementes/error";
import { signin } from "../../services/API/routes/common";
import { useAuth } from "../../context/AuthContext";

interface LoginData {
  email: string;
  password: string;
}

export default function OrganizationSignin() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!loginData.email) tempErrors.email = "Email is required";
    if (!loginData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        const response = await signin({
          email: loginData.email,
          password: loginData.password,
          role: "organisation",
        });
        if (response.success) {
          const { token, user } = response;
          setUser(user);
          Cookies.set("organisationToken", token);
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
          mt: 15,
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom color="primary">
          Welcome Back!
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          Log in to your account and continue streamlining your hiring process.
        </Typography>
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Email"
              variant="standard"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="standard"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              loading={loading}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
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
            Don't have an account?{" "}
            <div
              className="cursor-pointer"
              style={{ display: "inline-block" }}
              onClick={() => Navigate("/organisation/sign-up")}
            >
              <Link variant="body2">Sign Up</Link>
            </div>
          </Typography>
        </Box>
      </Container>
    </center>
  );
}
