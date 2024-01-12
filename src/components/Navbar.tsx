import { useState } from "react"
import Dropdown from "../assets/svg/DropDown"
import Logo from "../assets/svg/Logo"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState<boolean>(false);
    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/auth/login')
    }
    const username = localStorage.getItem('name') || '';
    return (

        <header className='navbar'>
            <div className='logo'>
                <Logo />
                <span className='logo_name'>
                    SPACE<span className='JAT'>JAT</span>
                </span>
            </div>
            <div className='userInfo' onClick={() => setShowLogout(true)} >
                <span className='userName'>{username}</span>
                <Dropdown />
            </div>
            {
                showLogout ? <>
                    <div className='logout-container' onClick={() => setShowLogout(false)} />
                    <div className='logout' onClick={() => logOut()}>
                        <div>
                            <h2>
                                Logout
                            </h2>
                        </div>
                    </div>
                </> : null
            }

        </header>


    )
}

export default Navbar