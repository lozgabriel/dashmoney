import './ContentHeader.css';

function ContentHeader(props) {
  return (
    <section className="content-header">
      <h1>{props.title}</h1>
      <h3>{props.subtitle}</h3>
    </section>
  );
}   
export default ContentHeader;