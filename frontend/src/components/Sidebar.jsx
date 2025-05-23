import Menu from './Menu';
import './Sidebar.css';

function Sidebar() {
    return (
        <aside className='main-sidebar'>
            <section className='sidebar'>
                <Menu />
            </section>
        </aside>
    )
}

export default Sidebar;