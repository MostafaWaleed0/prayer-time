import axios from 'axios';

export async function loadGeolocation(ip: string | undefined) {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
