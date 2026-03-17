
import InputText from '../components/InputText.tsx'

function Login() {
    return (
        <div>
            <h1>Login Page</h1>
            <form method="post" action="">
                <div>
                    <label>
                        Username:
                        <InputText />
                    </label>
                </div>

                <div>
                    <label> 
                        Password:
                        <InputText />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login