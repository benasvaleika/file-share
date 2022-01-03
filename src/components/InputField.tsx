interface InputFieldProps {
  placeholder: string;
  value: string;
  size?: keyof typeof sizeClassNames;
  color?: keyof typeof colorClassNames;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const sizeClassNames = {
  big: "w-54 h-6",
  small: "w-full max-w-none h-6",
};

const colorClassNames = {
  primary: "bg-primary",
  secondary: "bg-secondary-one",
};

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChange,
  size = "big",
  color = "primary",
  className = "",
}) => {
  return (
    <input
      className={`rounded-md text-white pl-1 border-none font-rhd font-bold placeholder:text-slate-200 
        ${sizeClassNames[size]} ${colorClassNames[color]} ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    ></input>
  );
};
