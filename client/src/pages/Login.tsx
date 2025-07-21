import { Container, Box, Typography, Paper } from "@mui/material";
import LoginForm from "../components/login";

function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "auto",
          mt:2
        }}
      >
        <Paper elevation={3} sx={{ p: 1, width: "100%", borderRadius: 2 }}>
          <Typography variant="h5" sx={{textAlign:'center'}}>
            Welcome Back
          </Typography>

          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginPage;
