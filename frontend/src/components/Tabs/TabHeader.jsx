import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../../redux/tabReducer';
import styles from './TabHeader.module.css'

function TabHeader(props) {
    const dispatch = useDispatch();
    const activeTab = useSelector(state => state.tab.activeTab);

    const handleTabClick = () => {    
        dispatch(setActiveTab(props.target));
    };

    return (
        <li className={`${styles.itemTab} ${activeTab === props.target ? styles.active : ''}`}>
            <button
                type="button"
                className={styles.itemTab}
                onClick={handleTabClick}
            >
                <i className="material-symbols-outlined pr-5">{props.icon}</i>
                {props.label}
            </button>
        </li>
    )
}

export default TabHeader