import Request from 'utils/request';

export const registerUser = async userDetails => {
  return await Request({
    url: '/api/auth/register',
    method: 'POST',
    data: userDetails,
  });
}

export const verifyEmailCode = async code => {
  return await Request({
    url: '/api/auth/email-verify',
    method: 'POST',
    data: code
  });
}

export const resentEmailCode = async email => {
  return await Request({
    url: '/api/auth/resend-code',
    method: 'POST',
    data: { email }
  });
}
