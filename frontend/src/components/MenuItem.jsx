import { Link } from 'react-router-dom';
import './MenuItem.css';

function MenuItem(props) {
    return (
        <li className='item-menu mb-10'>
            <Link className='item-menu-path' to={props.path}>
                <i className="material-symbols-outlined pr-5">{props.icon}</i>
                {props.label}
            </Link>
        </li>
        
    )
}

export default MenuItem;