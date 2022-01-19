import React from 'react';
interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="flex justify-center w-full mt-6 text-white font-rhd">
      <div className="flex">
        <div>About</div>
        <div>&nbsp;|&nbsp;</div>
        <div>How to use</div>
        <div>&nbsp;|&nbsp;</div>
        <div>Terms of use</div>
        <div>&nbsp;|&nbsp;</div>
        <div>Github</div>
      </div>
    </div>
  );
};
