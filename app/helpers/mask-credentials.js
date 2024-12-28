export default function maskCredentials(credentials = '') {
  return credentials.slice(0, 3) + '****' + credentials.slice(-2);
}
