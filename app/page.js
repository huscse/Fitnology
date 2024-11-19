'use client'
import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, TextField, Button, Box, Card, Grid, CardContent, CardActions, CardHeader, Avatar,
  Snackbar, Alert, CircularProgress, IconButton, Link
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import axios from 'axios';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Chatbot from './chatbot';
import { GithubIcon } from 'lucide-react';

// Create a modern theme with blue and teal tones
const modernTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // Bright blue
    },
    secondary: {
      main: '#14b8a6', // Teal
    },
    background: {
      default: '#0f172a', // Very dark blue
      paper: '#1e293b', // Dark blue-gray
    },
    text: {
      primary: '#f1f5f9', // Very light gray
      secondary: '#94a3b8', // Light blue-gray
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

const MotionContainer = motion(Container);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  padding: theme.spacing(6, 0),
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

function Footer() {
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email);
    setSnackbar({
      open: true,
      message: 'Thank you for subscribing!',
      severity: 'success',
    });
    setEmail('');
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              FitNology is your ultimate health companion, helping you track calories, get personalized advice, and stay updated with the latest health trends.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" display="block">Home</Link>
            <Link href="#" color="inherit" display="block">Calorie Tracker</Link>
            <Link href="#" color="inherit" display="block">AI Coach</Link>
            <Link href="#" color="inherit" display="block">Health Articles</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
  <Typography variant="h6" color="text.primary" gutterBottom>
    Connect With Us
  </Typography>
  <Box>
    <SocialIcon aria-label="github" href="https://github.com/boiledpotatoe" target="_blank" rel="noopener noreferrer">
      <GithubIcon />
    </SocialIcon>
    <SocialIcon aria-label="linkedin" href="https://linkedin.com/in/husnain-khaliq-5414b9277" target="_blank" rel="noopener noreferrer">
      <LinkedInIcon />
    </SocialIcon>
  </Box>
</Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Subscribe to Our Newsletter
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Subscribe
              </Button>
            </form>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} FitNology. All rights reserved.
          </Typography>
        </Box>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </FooterContainer>
  );
}

export default function Home() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [calories, setCalories] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCalorieSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    
    // Basic BMR calculation using Harris-Benedict Equation
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age));
    } else {
      bmr = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age));
    }

    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const dailyCalories = Math.round(bmr * activityMultipliers[activityLevel]);
    setCalories(dailyCalories);
    setLoading(false);
    setSnackbar({
      open: true,
      message: 'Calorie calculation complete!',
      severity: 'success'
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://newsdata.io', {
          params: {
            q: 'health',
            apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
            language: 'en',
            sortBy: 'publishedAt',
          },
        });
        setArticles(response.data.articles.slice(0, 6));
      } catch (error) {
        console.error('Error fetching articles:', error);
        setSnackbar({
          open: false,
          message: 'Failed to fetch articles. Please try again later.',
          severity: 'error'
        });
      }
    };

    fetchArticles();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #164e63 100%)',
          py: 6,
        }}
      >
        <MotionContainer maxWidth="lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <MotionTypography variant="h2" align="center" gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              background: 'linear-gradient(45deg, #3b82f6, #14b8a6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to FitNology
          </MotionTypography>
          <MotionTypography variant="h5" align="center" paragraph
            sx={{ color: 'text.secondary', mb: 6 }}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your ultimate health companion. Track your calories, get personalized advice, and stay updated with the latest health trends.
          </MotionTypography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MotionCard
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <FitnessCenterIcon />
                    </Avatar>
                  }
                  title="Calorie Tracker"
                  titleTypographyProps={{ variant: 'h6' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <form onSubmit={handleCalorieSubmit}>
                    <TextField
                      label="Weight (kg)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />
                    <TextField
                      label="Height (cm)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      required
                    />
                    <TextField
                      label="Age"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                    <TextField
                      select
                      label="Gender"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value=""></option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </TextField>
                    <TextField
                      select
                      label="Activity Level"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value)}
                      required
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value=""></option>
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Light Exercise</option>
                      <option value="moderate">Moderate Exercise</option>
                      <option value="active">Active</option>
                      <option value="veryActive">Very Active</option>
                    </TextField>
                    <Button
                      variant="contained"
                      color="#fffff"
                      type="submit"
                      fullWidth
                      sx={{ mt: 2 }}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Calculate'}
                    </Button>
                  </form>
                  {calories && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Typography variant="h6" color="primary">
                        Your Daily Calorie Needs:
                      </Typography>
                      <Typography variant="h4" color="secondary" sx={{ fontWeight: 'bold' }}>
                        {calories} calories
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionCard
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <ChatIcon />
                    </Avatar>
                  }
                  title="AI Fitness Coach"
                  titleTypographyProps={{ variant: 'h6' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chatbot />
                </CardContent>
              </MotionCard>
            </Grid>
          </Grid>

          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" align="center" paragraph color="text.primary">
              
            </Typography>
            <Grid container spacing={4}>
              {articles.map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <CardHeader
                      avatar={<Avatar src={article.urlToImage} alt={article.title} />}
                      title={article.title}
                      subheader={new Date(article.publishedAt).toLocaleDateString()}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {article.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" href={article.url} target="_blank" rel="noopener noreferrer">
                        Read More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </MotionContainer>
      </Box>
      <Footer />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}