import crypto from 'crypto-js';

const secret = '2022060517:44:190462851379'

const getHash = (str) => {
  const hash = crypto.HmacSHA256(str, secret);
  return crypto.enc.Hex.stringify(hash);
}

export { getHash }
