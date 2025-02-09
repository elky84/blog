
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";;

const Header = () => {
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
            {["/", "/about", "/project"].map((path, index) => (
                <Button key={index} color="inherit" component={RouterLink} to={path} 
                  sx={{ color: "primary.main", fontSize: "1.2rem" }}>
                    {["Home", "About", "Project"][index]}
                </Button>
            ))}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
  
export default Header;