import styles from "./Tabs.module.css"

function Tabs(props) {
  return (
    <div className={styles.navTabs}>
        {props.children}
    </div>
  );
}   
export default Tabs;