import axios from 'axios';

export async function loadGeolocation(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
