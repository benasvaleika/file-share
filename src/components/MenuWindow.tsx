import { ReactChild } from 'react';

interface MenuWindowProps {
  menuTitle: string;
  menuClassName?: string;
  bodyClassName?: string;
  mr: string;
  ml: string;
  children?: ReactChild;
}

export const MenuWindow: React.FC<MenuWindowProps> = ({
  menuTitle,
  menuClassName,
  bodyClassName,
  children,
  ml,
  mr,
}) => {
  return (
    <div className={`flex flex-col h-full  ${menuClassName}`}>
      <div className={`text-white text-xl font-rhd font-bold mb-2 ${ml}`}>{menuTitle}</div>
      <div
        className={`w-[calc(100%-3rem)] ml h-full border-solid bg-primary rounded-lg ${ml} ${mr} ${bodyClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
