import styles from "./TabsHeader.module.css"

function TabsHeader(props) {
  return (
    <ul className={styles.navTabs}>
      {props.children}
    </ul>
  );
}   
export default TabsHeader;