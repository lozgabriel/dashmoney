import MenuItem from "./MenuItem";
import MenuTree from "./MenuTree";
import './Menu.css';

function Menu() {
    return (
        <ul className="sidebar-menu">
            <MenuItem path="/" icon="dashboard" label="Dashboard" />
            <MenuTree label="Cadastro" icon="checkbook">
                <MenuItem path="/billingCycle" icon="payments" label="Ciclos de pagamentos" />
            </MenuTree>
        </ul>
    )
}

export default Menu;