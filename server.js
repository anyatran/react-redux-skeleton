const config = require('./config/webpack.config.dev');
const path = require('path');
const port = (process.env.PORT || 3000);
const request = require('request');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const repos = {
  'rails': 'https://api.github.com/repos/rails/rails/pulls',
  'beets': 'https://api.github.com/repos/beetbox/beets/pulls'
}

const server = new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  disableHostCheck: true,
  hot: true,
  setup: function(app) {

    app.get('/events', (req, res) => {
      const repo = repos[req.query.repo] || repos['rails']
      console.log(repo)
      const options = {
        url: repo,
        headers: {
          'User-Agent': 'anyatran'
        }
      }
      request.get(options, (err, response, body) => {
        res.send(body);
      });
    });
  }
});
server.listen(port, function (err, result) {
  if (err) {
    console.log(err)
  }
  console.log(`Listening at http://localhost:${port}`)
});
