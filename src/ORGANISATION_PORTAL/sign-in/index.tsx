import { useState } from "react";
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

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!loginData.email) tempErrors.email = "Email is required";
    if (!loginData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // console.log("User Logged In", loginData);
      Cookies.set(
        "organisationToken",
        "dcbjbvwsojvcjbdwivifbwrifurwiufwrgfbwruofgwiufgwif"
      );
      const loginInterval = setInterval(() => {
        if (Cookies.get("organisationToken")) {
          clearInterval(loginInterval);
          Navigate("/organisation/dashboard");
        }
      }, 100);
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
        <Box component="form" sx={{ mt: 3 }}>
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
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
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
              onClick={() => Navigate("/organisation/signup")}
            >
              <Link variant="body2">Sign Up</Link>
            </div>
          </Typography>
        </Box>
      </Container>
    </center>
  );
}
