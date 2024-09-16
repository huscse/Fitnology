// Footer.js
import React from 'react';
import { Box, Container, Typography, Link, Grid, TextField, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';

// Create a theme for the footer
const footerTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#14b8a6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function Footer() {
  return (
    <ThemeProvider theme={footerTheme}>
      <Box
        sx={{
          background: '#1e293b',
          py: 4,
          mt: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1" color="text.secondary">
                For any inquiries or feedback, please reach out to us at:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <EmailIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                <Link href="mailto:support@fitnology.com" color="inherit">
                  support@fitnology.com
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" gutterBottom>
                Subscribe to Our Newsletter
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Subscribe
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} FitNology. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
