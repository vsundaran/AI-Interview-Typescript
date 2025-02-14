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
import { useLocation, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const Navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  const portalName = path.split("/")?.[1];

  const validate = () => {
    const tempErrors: { email?: string } = {};
    if (!email) tempErrors.email = "Email is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Simulate sending reset email
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
          Forgot Your Password?
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          No worries! Enter your email below, and we’ll send you a link to reset
          your password.
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email"
            variant="standard"
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
          <Stack spacing={1} mt={1}>
            <Typography variant="body2">
              Already have an account?{" "}
              <div
                className="cursor-pointer"
                style={{ display: "inline-block" }}
                onClick={() => Navigate(`/${portalName}/sign-in`)}
              >
                <Link variant="body2">Sign in</Link>
              </div>
            </Typography>

            <Typography variant="body2">
              Don't have an account?{" "}
              <div
                className="cursor-pointer"
                style={{ display: "inline-block" }}
                onClick={() => Navigate(`/${portalName}/sign-up`)}
              >
                <Link variant="body2">Sign Up</Link>
              </div>
            </Typography>
          </Stack>
        </Box>
      </Container>
    </center>
  );
}
