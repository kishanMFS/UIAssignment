
import { useState } from 'react';
import InputText from '../components/InputText.tsx'
import loginUser from '../services/loginAPI.ts'
import { useNavigate } from 'react-router-dom';


function Login() {
    const [ email, setEmail ] = useState('john@mail.com')
    const [ password, setPassword ] = useState('changeme')
    const navigate = useNavigate()

    async function handleLoginUser (e: React.FormEvent) {
        e.preventDefault();

        try {
            const credentials = { email, password };
            const response = await loginUser(credentials);
            const jwttoken = response.access_token;
            if(jwttoken){
                localStorage.setItem('jwtToken', jwttoken);
                navigate('/projects');
            }
            else {
                localStorage.removeItem('jwtToken');
                navigate('/');
            }
            console.log(response);
        } catch (error: any) {
            console.error('Login failed:', error);
        }
    }


    return (
        <div>
            <h1>Login Page</h1>
            <form method="post" action="" onSubmit={handleLoginUser}>
                <div>
                    <label>
                        Email:
                        <InputText inputValue={email} onInputChange={setEmail}/>
                    </label>
                </div>

                <div>
                    <label> 
                        Password:
                        <InputText inputValue={password} onInputChange={setPassword}/>
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login