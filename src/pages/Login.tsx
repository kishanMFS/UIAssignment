
import { useEffect, useState } from 'react';
import InputText from '../components/InputText.tsx'
import loginUser from '../services/loginAPI.ts'
import Spinner from '../components/Spinner.tsx';

import { UserAuth } from '../context/authenticationContext.tsx';
import { useNavigate } from 'react-router-dom'

function Login() {
    const [ formField, setFormField ] = useState<object>({email: 'john@mail.com', password: 'changeme'});
    const { login } = UserAuth();
    const [ errors, setErrors ] = useState<object>({email: '', password: ''});
    const [ loginApiError, setloginApiError ] = useState<string>('');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
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
            return;
        }
        try {
            const credentials = { email: formField.email, password: formField.password };
            const response = await loginUser(credentials);
            const jwttoken = response.access_token;
            if(jwttoken){
                login(jwttoken);
            }
            
            setIsLoading(false);
            if(response.statusCode === 401){
                setloginApiError(response.message);
            }
            console.log(response);
        } catch (error: any) {
            console.error('Login failed:', error);            
            setIsLoading(false);
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

        const token = localStorage.getItem("jwtToken")
        if(token){
            navigate('/projects')

        }
    })
    return (
        <div>
            {isLoading && <Spinner />}
            {loginApiError && <p className='error-message'>{loginApiError}</p>}
            
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