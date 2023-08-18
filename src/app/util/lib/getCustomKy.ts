import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';

import { clearJwt, getJwt } from './apiJwt';

const afterResponse: AfterResponseHook = async (request, options, response) => {
  if (response.status === 401) {
    // TODO: Implement unauthorized message
    clearJwt();
  }

  if (response.status === 410) {
    // TODO: Implement user account deleted message
    clearJwt();
  }
};

const beforeRequest: BeforeRequestHook = (request) => {
  request.headers.append('Authorization', `Bearer ${getJwt()}`);
};

const apiRoot = ky.create({
  prefixUrl: 'http://localhost:3000/',
  hooks: { afterResponse: [afterResponse], beforeRequest: [beforeRequest] },
  throwHttpErrors: false,
});

export const getCustomKy = () => apiRoot;
