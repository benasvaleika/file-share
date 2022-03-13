// import { config as dotenv } from 'dotenv';

// Using environment variables with react-scritps causes
// Uncaught ReferenceError: process is not defined error.
// TODO fix the error mentioned above

// dotenv();

// export const WS_URL = process.env.WS_URL;

export const iceServers = [
  {
    urls: [
      'stun:stun.l.google.com:19302',
      'stun:stun1.l.google.com:19302',
      'stun:stun2.l.google.com:19302',
    ],
  },
];
