interface ButtonProps {
  name: string;
  size?: keyof typeof sizeClassNames;
  color?: keyof typeof colorClassNames;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const sizeClassNames = {
  big: "h-6 w-24",
  small: "h-6 w-14",
};

const colorClassNames = {
  secondaryOne: "bg-secondary-one",
  secondaryTwo: "bg-secondary-two",
};

export const Button: React.FC<ButtonProps> = ({
  name,
  size = "big",
  color = "secondaryOne",
  onClick,
  className,
}) => {
  return (
    <button
      className={`text-white rounded text-base font-rhd font-bold ${colorClassNames[color]} ${sizeClassNames[size]} ${className}`}
      onClick={(e) => onClick(e)}
    >
      {name}
    </button>
  );
};
