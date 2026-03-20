
import { useEffect, useState } from 'react';
import InputText from '../components/InputText.tsx'
import loginUser from '../services/loginAPI.ts'
import Spinner from '../components/Spinner.tsx';

import { UserAuth } from '../context/authenticationContext.tsx';
import { useNavigate } from 'react-router-dom'

interface formFiledType {
    email: string,
    password: string
}

function Login() {
    const [ formField, setFormField ] = useState<formFiledType>({email: 'john@mail.com', password: 'changeme'});
    const { login, isLoggedIn } = UserAuth();
    const [ errors, setErrors ] = useState<formFiledType>({email: '', password: ''});
    const [ loginApiError, setloginApiError ] = useState<string>('');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ progress, setProgress ] = useState(0)
    const navigate = useNavigate()

    const validateForm = (): boolean => {
        let hasError = false;
        const errorMessages: { email: string; password: string } = { email: '', password: '' };

        if (!formField.email.length){
            errorMessages.email = 'Email is required.';
            hasError = true;
        }
        if (!formField.password.length) {
            errorMessages.password = 'Password is required.';
            hasError = true;
        }
        // Simple email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formField.email.length && !emailRegex.test(formField.email)) {
            errorMessages.email = 'Please enter a valid email address.';
            hasError = true;
        }

        setErrors(errorMessages);
        return hasError;
    }

    async function handleLoginUser (e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setloginApiError('');
        
        if (validateForm()) {
            setIsLoading(false);
            setProgress(0)
            return;
        }
        function onProgress(value:number) {
            setProgress(value)
        }
        try {
            const credentials = { email: formField.email, password: formField.password };
            const response = await loginUser({credentials, onProgress});
            const jwttoken = response.access_token;
            if(jwttoken){
                login(jwttoken);
            }
            
            setIsLoading(false);
            setProgress(0)
            if(response.statusCode === 401){
                setloginApiError(response.message);
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            setIsLoading(false);
            setProgress(0)
            setloginApiError('An error occurred during login. Please try again later.');
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormField((prev) => ({
            ...prev,
            [field]: value
        }));
    }
    useEffect(()=> {
        if(isLoggedIn){
            navigate('/projects')

        }
    })
    return (
        <div>
            {isLoading && <Spinner />}
            {loginApiError && <p className='error-message'>{loginApiError}</p>}
            {
                isLoading
                && 
                (<div className='progress-bar-container'>
                    <div className='progress-bar' style={{ width: `${progress}%` }}>
                    </div>
                </div>)
            }
            <div className="login-container">
                <h1>Login Page</h1>
                <form method="post" action="" onSubmit={handleLoginUser}>
                    <div className='input-field'>
                        <label>
                            Email:
                            <InputText inputName="email" 
                                    inputValue={formField.email} 
                                    onInputChange={handleInputChange} 
                                    errorMessage={errors.email} />
                        </label>
                    </div>

                    <div className='input-field'>
                        <label> 
                            Password:
                            <InputText inputName="password" 
                                    inputValue={formField.password} 
                                    onInputChange={handleInputChange} 
                                    errorMessage={errors.password} />
                        </label>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login