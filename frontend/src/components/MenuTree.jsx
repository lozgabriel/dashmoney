import React, { useState } from 'react';
import './MenuTree.css';

function MenuTree(props) {
    const [open, setOpen] = useState(false);

    const openMenu = (e) => {
        e.preventDefault();
        setOpen(!open);
    }

    return (
        <li className="treeview">
            <button className='treeview-btn' type="button" onClick={openMenu}>
                <i className="material-symbols-outlined">
                    {open ? 'expand_more' : 'chevron_right'}
                </i>                
                <i className="material-symbols-outlined pr-5">{props.icon}</i>
                {props.label}
            </button>
            <ul className={`treeview-menu ${open ? ' menu-open' : ''}`}>
                {props.children}
            </ul>
        </li>
    )
}

export default MenuTree;