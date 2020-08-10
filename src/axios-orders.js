import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-e0ca1.firebaseio.com/'
});

export default instance;
