export default function Button({ label, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}

Button.defaultProps = {
  label: 'Click Me',
  onClick: () => {},
  className: '',
};
