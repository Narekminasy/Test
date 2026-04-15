import { read, write, add, getDataPath } from '../utils/storage.js';
import { resHelper } from '../utils/parser.js';
import { EventEmitter } from 'events';


const emitter = new EventEmitter();
const userJson = getDataPath('users.json');

emitter.on('login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const data = await read(userJson);
    const exes = data.find(u => u.password === password && u.email === email);
    if (!exes) {
      return resHelper(res, 401, { message: 'invaild password and email' });
    }
    return resHelper(res, 200, data);
  } catch (error) {
    resHelper(res, 500, { message: 'error log in' });

  }
});

emitter.on('register', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return resHelper(res, 401, { message: 'gave no email,name' });
    }
    const data = await read(userJson);
    const exes = data.find(u => u.email === email);
    if (exes) {
      return resHelper(res, 409, { message: 'Already exec' });
    }
    const user = {
      id: Date.now(),
      email,
      password,
    }
    await add(userJson, user);
    return resHelper(res, 201, { message: 'Ok registartion' });
  } catch (error) {
    return resHelper(res, 500, { message: 'error' });
  }
});

emitter.on('profile', async (req, res, query) => {
  try {
    const data = await read(userJson);
    const { id } = query;
    console.log(id);
    const exes = data.find(u => u.id == id);/////////////////////
    if (!exes) {
      return resHelper(res, 401, { message: 'invaild ID' });
    }
    return resHelper(res, 200, data);
  } catch (error) {
    return resHelper(res, 200, { message: 'Invaild Id' });
  }
});

emitter.on('deletePost', async (req, res, query) => {
  try {
    const data = await read(userJson);
    const { id } = query;
    const exes = data.find(u => u.id == id);/////////////////////
    if (!exes) {
      return resHelper(res, 404, { message: 'invaild ID' });
    }
    const exesdelete = data.filter(u => u.id !== Number(id));
    await write(userJson, exesdelete);
    return resHelper(res, 200, { message: 'deleted' });
  } catch (error) {
    return resHelper(res, 500, { message: 'Invaild Id' });
  }
});

export default emitter;
