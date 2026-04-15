import http from 'http';
import 'dotenv/config';

import usersEmitter from './handlers/users.js'
import postsEmitter from './handlers/posts.js'

import { queryParser, jsonBodyParser, parser, resHelper } from './utils/parser.js';

const { PORT } = process.env

const server = http.createServer(async function (req, res) {
  try {
    const { method, url, query } = await parser(req);

    if (method === 'POST' && url === '/login') {
      usersEmitter.emit('login', req, res);
      return;
    }
    if (method === 'POST' && url === '/register') {
      usersEmitter.emit('register', req, res, query);
      return;
    }

    if (method === 'GET' && url === '/profile') {
      usersEmitter.emit('profile', req, res, query);
      return;
    }
    if (method === 'DELETE' && url === '/delete') {
      usersEmitter.emit('deletePost', req, res, query);
      return;
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Route not found' }));
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.end(JSON.stringify({ message: 'Server error', error: e.message }));
  }
});

console.log(1);


server.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});


