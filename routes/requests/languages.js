import axios from 'axios';
import token from '../../token.js';

const fetchLanguage = async (owner, repo) => {
  try {
    const options = {
      url: `https://api.github.com/repos/${owner}/${repo}/languages`,
      method: 'get',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.TOKEN || token()}`,
      },
    };
    const response = await axios(options);
    if (response.data) {
      return response.data;
    }
    return {};
  } catch (error) {
    return error;
  }
};

const getLanguages = async (owner, names) => {
  const languages = [];
  for (const repo of names) {
    languages.push(fetchLanguage(owner, repo));
  }
  return Promise.all(languages);
};

export default getLanguages;
