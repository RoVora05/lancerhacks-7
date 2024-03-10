const express = require('express');
const http = require('http');
const cors = require('cors');
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyDUpTSYs3skKmhZuK-YTYWVlk8Hq8g-cYI';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/';

const genAI = new GoogleGenerativeAI("AIzaSyCrgBkTn2CUBRspdbeT0zP7fFjIXdeBUfY");

async function getQuestions(transcript) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  console.log(transcript)

  const prompt = transcript + "    Can you generate four questions and 4 possible answers and the correct answer in JSON format for this topic? Language should be english. Format for one questions: {question:QUESTION_NAME, answers: [{name:ANSWER_OPTION_NAME, correct: TRUE/FALSE}, ...]}";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let jsonData;
  try  {
    jsonData = JSON.parse(response.text().substring(7, response.text().length - 3).trim())
  } catch (e) {
    await getQuestions(transcript);
  }
  console.log("hello");
  return jsonData
}

function getVideoUrl(videoId) {
    try { 
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        return videoUrl
    } catch (error) {
      console.error('Error fetching video URL:', error);
      return null;
    }
  }

async function getPlaylistVideos(playlistId) {
    try {
        const response = await axios.get(`${BASE_URL}playlistItems`, {
            params: {
                part: 'snippet',
                playlistId: playlistId,
                key: API_KEY,
                maxResults: 20,
            }
        });

        if (response.data.items.length > 0) {
            let videos = [];
            for (const item in response.data.items) {
                let video = getVideoUrl(response.data.items[item].snippet.resourceId.videoId);
                
                console.log(video);
                videos.push({url: video, title: response.data.items[item].snippet.title});
            }

            console.log(videos[3]);
            const transcript = await getTranscript(videos[3].url);
            const questions = await getQuestions(videos[3].title);
            console.log(questions[0]);
            return videos;
          } else {
            throw new Error('Playlist not found.');
          }
    } catch (error) {
        console.error("Error fetching playlist:", error);
        return null
    }
}

async function searchVideos(query) {
  try {
    const response = await axios.get(`${BASE_URL}search`, {
      params: {
        part: 'snippet',
        type: 'playlist',
        q: query,
        key: API_KEY,
        maxResults: 5
      }
    });
    
    if (response.data.items.length > 0) {
        const playlistId = response.data.items[0].id.playlistId;
        await getPlaylistVideos(playlistId);
      } else {
        console.log('No playlists found for the given query.');
      }
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

searchVideos('Python Programmming');

async function getTranscript(url) {
    YoutubeTranscript.fetchTranscript(url, { lang: 'en' }).then((data) => {
        try {
            let fullTranscript;
            for (const index in data) {
                fullTranscript += data[index].text;
            }
            return fullTranscript;
        } catch {
        }
    });
}

const server  = http.createServer(app);
server.listen(5000, () => {
    console.log("Server listening on port 5000!");
});