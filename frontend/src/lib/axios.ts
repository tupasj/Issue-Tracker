import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

const axiosErrorHandler = (error: any) => {
  console.log('Axios error handler: ');
  if (error.response) {
    console.log(
      'The request was made and the server responded with a status code that falls out of the range of 2xx.'
    );
    console.log('data: ', error.response.data);
    console.log('status: ', error.response.status);
    console.log('headers: ', error.response.headers);
  } else if (error.request) {
    console.log(
      `The request was made but no response was received 'error.request' is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js.`
    );
    console.log('request: ', error.request);
  } else {
    console.log('Something happened in setting up the request that triggered an Error.');
    console.log('Error', error.message);
  }
  console.log(error.config);
};

export { axiosInstance, axiosErrorHandler };
