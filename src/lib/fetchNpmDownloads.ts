
import axios from 'axios';

export async function fetchNpmDownloads(pkg: string, period: 'week' | 'month') {
  const res = await axios.get(`https://api.npm-stat.com/v1/downloads?package=${pkg}&period=${period}`);
  return res.data;
}
