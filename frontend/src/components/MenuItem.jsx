import { Link } from 'react-router-dom';
import './MenuItem.css';

function MenuItem(props) {
    return (
        <li className='item-menu mb-2'>
            <Link className='item-menu-path' to={props.path}>
                <i className="material-symbols-outlined pr-1">{props.icon}</i>
                {props.label}
            </Link>
        </li>
        
    )
}

export default MenuItem;