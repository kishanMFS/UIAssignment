const loginAPI = import.meta.env.VITE_loginAPI;
interface loginUserType {
  credentials: { email: string; password: string };
  onProgress: (value: number) => void;
}
function loginUser({ credentials, onProgress }: loginUserType) {
  // const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(credential)
  // });
  // // console.log(response);

  // return response.json();

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", loginAPI);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        onProgress(Math.round(percent));
      }
    };
    xhr.onload = () => {
      resolve(JSON.parse(xhr.response));
    };
    xhr.onerror = reject;
    xhr.send(JSON.stringify(credentials));
  });
}

export default loginUser;
