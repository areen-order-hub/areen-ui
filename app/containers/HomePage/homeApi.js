import Request from 'utils/request';

export const getRepo = async username => {
  console.log(username, 'username');
  return await Request({
    url: `/users/${username}/repos?type=all&sort=updated`,
    method: 'GET',
  });
};
