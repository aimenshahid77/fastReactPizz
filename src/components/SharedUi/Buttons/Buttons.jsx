const Buttons = ({
  btnName = "Button",
  onClick = () => {},
  size = "w-40 h-10",
  type = "button",
}) => {
  return (
    <button
      className={`bg-amber-500 ${size} text-white px-4 py-2 rounded-lg`}
      onClick={onClick}
      type={type}
    >
      {btnName}
    </button>
  );
};

export default Buttons;
