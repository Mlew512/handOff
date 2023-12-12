import React, { useState } from 'react';
import axios from 'axios';

function SUMMERIZE() {
  const [prompt, setPrompt] = useState('');
  const [responseContent, setResponseContent] = useState('');

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleApiCall = async () => {
    try {
      const response = await axios.post('http://your-api-url/gptai-api/', { prompt });
      setResponseContent(response.data.response_content);
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  return (
    <div>
      <label>
        Prompt:
        <input type="text" value={prompt} onChange={handlePromptChange} />
      </label>
      <button onClick={handleApiCall}>Make API Call</button>
      <div>
        <strong>Response Content:</strong> {responseContent}
      </div>
    </div>
  );
}

export default SUMMERIZE;
