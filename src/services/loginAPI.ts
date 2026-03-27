const loginAPI = import.meta.env.VITE_loginAPI;

interface callApiType {
  apiURL: string;
  param: object;
  onProgress: (value: number) => number;
  resolve: () => JSON;
  reject: () => JSON;
}
interface loginUserType {
  callApi: callApiType;
  credentials: { email: string; password: string };
  onProgress: (value: number) => number;
}
function loginUserService({ callApi, credentials, onProgress }: loginUserType) {
  return new Promise((resolve, reject) => {
    callApi({
      apiURL: loginAPI,
      param: credentials,
      onProgress,
      resolve,
      reject,
    });
  });
}

export default loginUserService;
