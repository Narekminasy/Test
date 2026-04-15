import { EventEmitter } from 'events';

const emitter = new EventEmitter();

emitter.on('allPosts', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  res.end('<h1>allPosts</h1>');
});

emitter.on('createPost', async (req, res) => {
  try {
    // .. some error

    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end('<h1>createPost</h1>');
  } catch (e) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 500;
    res.end(`<h1>${e.message}</h1>`);
  }
});

emitter.on('deletePost', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  res.end('<h1>deletePost</h1>');
});

export default emitter;
