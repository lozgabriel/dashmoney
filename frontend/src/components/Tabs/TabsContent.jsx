import styles from "./TabsContent.module.css"

function TabsContent(props) {
  return (
    <div className={styles.tabContent}>
        {props.children}
    </div>
  );
}   
export default TabsContent;