import { useSelector } from 'react-redux';
import styles from "./TabContent.module.css"

function TabContent(props) {
  const activeTab = useSelector(state => state.tab.activeTab);

  return (
    <div id={props.id} className={`${styles.tabContent} ${activeTab === props.id ? styles.active : ''}`}>
      {props.children}
    </div>
  );
}   
export default TabContent;