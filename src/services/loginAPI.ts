export interface loginCredentials {
    email: string;
    password: string;
}

async function loginUser (credentials: loginCredentials) {
    const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    console.log(response);
    
    return response.json();

}

export default loginUser;