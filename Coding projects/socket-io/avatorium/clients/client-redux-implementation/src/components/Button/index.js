import "./styles.scss";

const Button = ({ onClick, children, ...props }) => (
  <button className="button" onClick={onClick} {...props}>{children}</button>
);

export default Button;