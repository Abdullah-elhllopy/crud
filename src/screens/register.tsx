import InputField from 'components/InputField'
import { validateField } from 'common/Validation';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
export interface User {
    name: string;
    password: string;
    email: string;
}
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [nameError, setNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false)

    const handleBlur = (type: 'name' | 'email' | 'password') => {
        switch (type) {
            case 'name':
                validateField(type, name, setNameError);
                break;
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
        validateField('name', name, setNameError);
        validateField('email', email, setEmailError);
        validateField('password', password, setPasswordError);
        if (!nameError && !emailError && !passwordError) {
            localStorage.setItem('token', 'true');
            localStorage.setItem('name', name);
            const users: User[] = JSON.parse(localStorage.getItem('users') || '[]') || [];
            if (Array.isArray(users)) {
                users.push({
                    name: name,
                    email: email,
                    password: password
                })
                localStorage.setItem('users', JSON.stringify(users));
            }
            navigate('/');
        } else {
            setFormSubmitted(true);
        }
    };

    return (
        <div className='login_container '>
            <form className='login ' onSubmit={handleSubmit}>
                <h2 className='sign_in'>
                    Sign up
                </h2>
                <InputField
                    label='Name'
                    placeholder='Enter your name'
                    type='text' value={name}
                    setInputValue={setName}
                    errorState={(formSubmitted || nameError !== '')}
                    errorMessage={nameError}
                    handleBlur={() => handleBlur('name')}
                />
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
                    placeholder='Enter your password'
                    type='password'
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
                        Already have account? <Link to={'/auth/login'}>Signin</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default Register