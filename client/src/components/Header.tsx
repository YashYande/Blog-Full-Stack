import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  Container,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Header() {
  const { user, loggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  
  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#416892ff",borderTopLeftRadius:'10px',borderTopRightRadius:'10px' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            BlogIt
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              component={Link}
              to="/home"
              sx={{ color: "white", textTransform: "none", mx: 1 }}
            >
              Home
            </Button>

            {!loggedIn ? (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{ color: "white", textTransform: "none", mx: 1 }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  sx={{
                    backgroundColor: "orange",
                    color: "#0a1929",
                    textTransform: "none",
                    mx: 1,
                    "&:hover": { backgroundColor: "yellow" },
                  }}
                >
                  Get Started
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/home"
                  sx={{ color: "white", textTransform: "none", mx: 1 }}
                >
                  All Posts
                </Button>
                <Button
                  component={Link}
                  to="/blog/new"
                  sx={{ color: "white", textTransform: "none", mx: 1 }}
                >
                  New Blog
                </Button>

                
                <Stack direction="row" spacing={2} alignItems="center" mx={2}>
                  <Typography sx={{ color: "white" }}>
                    Welcome, {user?.firstName}
                  </Typography>
                  <Avatar sx={{ bgcolor: "orange" }}>
                    {user?.firstName?.[0]?.toUpperCase()}
                    {user?.lastName?.[0]?.toUpperCase()}
                  </Avatar>
                </Stack>

                <Button
                  component={Link}
                  to="/profile"
                  sx={{ color: "white", textTransform: "none", mx: 1 }}
                >
                  Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    mx: 1,
                    border: "1px solid white",
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
