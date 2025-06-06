import "./ValueBox.css";

function ValueBox(props) {
  return (
    <div className="value-box">
        <div className="value-box-content">
            <div className="value-box-header">
                <h2>{props.value}</h2>
                <i className="material-symbols-outlined pr-1">{props.icon}</i>
            </div>
            <p>{props.text}</p>
        </div>
    </div>
  );
}   

export default ValueBox;