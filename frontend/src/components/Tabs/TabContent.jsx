import { useSelector } from 'react-redux';
import styles from "./TabContent.module.css"

function TabContent(props) {
  const activeTab = useSelector(state => state.tab.activeTab);
  const visibleTabs = useSelector((state) => state.visibleTabs.visibleTabs);

  if (!visibleTabs.includes(props.id)) {
      return null;  // Não renderiza se não estiver na lista
  }

  return (
    <div id={props.id} className={`${styles.tabContent} ${activeTab === props.id ? styles.active : ''}`}>
      {props.children}
    </div>
  );
}   
export default TabContent;