import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://3.87.134.173:808/';

export default axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Authorization': localStorage.getItem('token'),
  },
})
