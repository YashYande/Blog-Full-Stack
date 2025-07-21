import { Container, Box} from "@mui/material";
import RegisterForm from "../components/register";

function RegisterPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <RegisterForm />
      </Box>
    </Container>
  );
}

export default RegisterPage;
