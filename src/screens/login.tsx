import { validateField } from 'common/Validation';
import InputField from 'components/InputField'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { User } from './register';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [invalidData, setIsInvalidData] = useState<boolean>(false);

    const handleBlur = (type: 'email' | 'password') => {
        switch (type) {
            case 'email':
                validateField(type, email, setEmailError);
                break;
            case 'password':
                validateField(type, password, setPasswordError);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateField('email', email, setEmailError);
        validateField('password', password, setPasswordError);
        if (!emailError && !passwordError) {
            const users: User[] = JSON.parse(localStorage.getItem('users') || '[]') || [];
            const userExists = users.some(user => user.email === email && user.password === password);
            if (userExists) {
                localStorage.setItem('token', 'true');
                localStorage.setItem('name', 'Abdallah Ahmed');
                navigate('/')
            } else {
                setIsInvalidData(true)
            }

        } else {
            setFormSubmitted(true);
        }
    };
    return (
        <div className='login_container'>
            <form className='login' onSubmit={handleSubmit}>
                <h2 className='sign_in'>
                    Sign in
                </h2>
                {
                    invalidData ? <div className='invalid_card'>
                        <p className='invalid_text'>Invalid email or password!</p>
                    </div> : null
                }

                <InputField
                    label='Email'
                    placeholder='Enter your email'
                    type='email'
                    value={email}
                    setInputValue={setEmail}
                    errorState={(formSubmitted || emailError !== '')}
                    errorMessage={emailError}
                    handleBlur={() => handleBlur('email')}
                />
                <InputField
                    label='Password'
                    type='password'
                    placeholder='Enter your password'
                    setInputValue={setPassword}
                    value={password}
                    errorState={(formSubmitted || passwordError !== '')}
                    errorMessage={passwordError}
                    handleBlur={() => handleBlur('password')}
                />
                <button type='submit' className='submit_btn'>
                    Submit
                </button>
                <div className='d-flex or'>
                    <div className='line' />
                    <span>OR</span>
                    <div className='line' />
                </div>
                <div className='d-flex haveNotAccount'>
                    <span>
                        Don’t have account? <Link to={'/auth/register'}>Signup</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default Login