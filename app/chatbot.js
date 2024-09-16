// Chatbot.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInput.trim()) {
      setResponses([...responses, { role: 'user', content: userInput }]);
      setUserInput('');
      setLoading(true);

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o',
            messages: [{ role: 'user', content: userInput }],
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setResponses([...responses, { role: 'user', content: userInput }, { role: 'assistant', content: response.data.choices[0].message.content }]);
      } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        setResponses([...responses, { role: 'user', content: userInput }, { role: 'assistant', content: 'Sorry, I couldn\'t process your request.' }]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, height: '400px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {responses.map((response, index) => (
          <Typography key={index} align={response.role === 'user' ? 'right' : 'left'}>
            <strong>{response.role === 'user' ? 'You: ' : 'Coach: '}</strong>{response.content}
          </Typography>
        ))}
        {loading && <Typography>Loading...</Typography>}
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Ask me anything"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userInput}
          onChange={handleUserInputChange}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Send
        </Button>
      </form>
    </Box>
  );
};

export default Chatbot;
