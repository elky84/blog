import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";

const Header = () => {
  const homepage = process.env.PUBLIC_URL || "";
  const baseDomain = new URL(homepage, window.location.origin).origin;

  const buttonLabels = ["Home", "About", "Project", "Fan", "Review", "Portfolio"];
  const paths = ["/", "/about", "/project", `${baseDomain}/fan`, `${baseDomain}/review`, `${baseDomain}/portfolio`];

  return (
    <>
      <AppBar position="static" color="inherit">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <Typography variant="h6" noWrap component="div" 
                sx={{ flexGrow: 1, color: "primary.main", fontSize: "2rem" }}>
                엘키의 주절 주절
              </Typography>
            </Box>
            {paths.map((path, index) => (
              path.startsWith(baseDomain) ? (
                <Button key={index} color="inherit" component="a" href={path} 
                  target="_blank" rel="noopener noreferrer"
                  sx={{ color: "primary.main", fontSize: "1.1rem" }}>
                  {buttonLabels[index]}
                </Button>
              ) : (
                <Button key={index} color="inherit" component={RouterLink} to={path} 
                  sx={{ color: "primary.main", fontSize: "1.1rem" }}>
                  {buttonLabels[index]}
                </Button>
              )
            ))}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Header;
