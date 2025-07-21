import { Box, Container, Typography, Button, Stack } from "@mui/material";

export default function LandingPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.5), 
            rgba(0, 0, 0, 0.5)
          ), url('./blog.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb:2 }}>
            Hey, we're <span style={{ color: "#90caf9" }}>BlogIt</span>.
          </Typography>
          <Typography variant='h3' sx={{fontWeight:700,mt:5}}>
               See our thoughts, stories, and ideas.
          </Typography>

          <Stack direction="row" spacing={2} mt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 3,
              }}
            >
              Let’s Get Started
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 3,
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Explore More
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
