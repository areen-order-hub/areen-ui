import Request from 'utils/request';

export const authenticateUser = async () => {
    return await Request({
        url: '/api/auth',
        method: 'GET'
    });
}