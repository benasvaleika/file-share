interface LineProps {
  className?: string;
}

export const Line: React.FC<LineProps> = ({ className }) => {
  return (
    <div className={` h-[1px] w-[calc(100%-2rem)] bg-secondary-one ml-2 my-1 ${className}`}></div>
  );
};
