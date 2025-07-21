import { Box, Typography, Link, IconButton, Divider, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#696d71ff",
        borderRadius:'10px',
        color: "white",
        py: 4,
        px: 3,
        mt: 6,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Blog<span style={{ color: "yellow" }}>It</span>
        </Typography>
        <Typography variant="body2" sx={{ maxWidth: 500 }}>
          Your go-to place for tech articles, tutorials, personal stories, and insights from developers around the world.
        </Typography>
      </Box>

      <Stack direction="row" spacing={4} sx={{ flexWrap: "wrap", mb: 3 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Quick Links
          </Typography>
          <Stack spacing={1}>
            <Link href="/" underline="hover" color="inherit">Home</Link>
            <Link href="/profile" underline="hover" color="inherit">Profile</Link>
            <Link href="/create" underline="hover" color="inherit">Create Post</Link>
            <Link href="/login" underline="hover" color="inherit">Login</Link>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Resources
          </Typography>
          <Stack spacing={1}>
            <Link href="#" underline="hover" color="inherit">Terms & Conditions</Link>
            <Link href="#" underline="hover" color="inherit">Privacy Policy</Link>
            <Link href="#" underline="hover" color="inherit">Support</Link>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Connect
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton href="/" target="_blank" sx={{ color: "#fff" }}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="/" target="_blank" sx={{ color: "#fff" }}>
              <TwitterIcon />
            </IconButton>
            <IconButton href="/" target="_blank" sx={{ color: "#fff" }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton href="/" target="_blank" sx={{ color: "#fff" }}>
              <GitHubIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ backgroundColor: "red", my: 2 }} />

      <Typography variant="body2" align="center" color="gray">
        &copy; 2025  BlogIt. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
