import { config as dotenv } from 'dotenv';

dotenv();

export const WS_URL = process.env.WS_URL;

export const ICE_SERVERS = [
  {
    urls: [
      'stun:stun.l.google.com:19302',
      'stun:stun1.l.google.com:19302',
      'stun:stun2.l.google.com:19302',
    ],
  },
];
