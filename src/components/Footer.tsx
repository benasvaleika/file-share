interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="flex justify-center w-full mt-4 text-white font-rhd text-sm">
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
