import styles from "./Tabs.module.css"

function Tabs(props) {
  return (
    <div className={styles.Tabs}>
        {props.children}
    </div>
  );
}   
export default Tabs;