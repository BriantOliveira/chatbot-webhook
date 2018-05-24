/********************************
*   WEBHOOK CONTROLER
********************************/

require('dotenv').config();
const API_KEY = process.env.SECRETKEY;
const http = require('http');

module.exports = (app) => {

  app.post('/details', (req, res) => {
    const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
    const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${movieToSearch}&apikey=${API_KEY}`);
    http.get(reqUrl, (responseFromAPI) => {
      let completeResponse = '';
      responseFromAPI.on('data', (chunk) => {
        completeResponse += chunk;
      });
      responseFromAPI.on('end', () => {
        const movie = JSON.parse(completeResponse);
        let dataToSend = movieToSearch === 'The Godfather' ? `I don't have the required info on that. Here's some info on 'The Godfather' instead.\n` : '';
        dataToSend += `${movie.Title}is a${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;

        return res.json ({
          speech: dataToSend,
          displayText: dataToSend,
          source: 'details'
        });
      });
    }, (error) => {
      return res.json({
        speech: 'Something went wrong!',
        displayText: 'ERROR: Something went wrong!',
        source: 'details'
      });
    });
  });
};
