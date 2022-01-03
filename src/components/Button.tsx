interface ButtonProps {
  name: string;
  size?: keyof typeof sizeClassNames;
  color?: keyof typeof colorClassNames;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const sizeClassNames = {
  big: 'h-6 w-24',
  medium: 'h-6 w-20',
  small: 'h-6 w-14',
};

const colorClassNames = {
  secondaryOne: 'bg-secondary-one hover:bg-secondary-two ease-in duration-150',
  secondaryTwo: 'bg-secondary-two hover:bg-secondary-one ease-in duration-150',
};

export const Button: React.FC<ButtonProps> = ({
  name,
  size = 'big',
  color = 'secondaryOne',
  onClick,
  className,
}) => {
  return (
    <button
      className={` rounded text-white font-rhd font-bold ${colorClassNames[color]} ${sizeClassNames[size]} ${className}`}
      onClick={(e) => onClick(e)}
    >
      {name}
    </button>
  );
};
