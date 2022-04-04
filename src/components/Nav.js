import logo from "../Images/logo-bg.png";
import classes from "../styles/Nav.module.css";
import Account from './Account';

const Nav = () => {
    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <a href="index.html" className={classes.brand}>
                        <img src={logo} alt="Learn with Sumit Logo" />
                        <h3>Learn with Sumit</h3>
                    </a>
                </li>
            </ul>
            <Account />
        </nav>
    );
};

export default Nav;