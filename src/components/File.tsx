import { FaRegFileAlt } from "react-icons/fa";
import { Button } from "./Button";

interface FileProps {
  fileName: string;
}

export const File: React.FC<FileProps> = ({ fileName }) => {
  return (
    <div className="text-secondary-two ml-2 flex justify-between mt-4">
      <div className="flex items-center">
        <FaRegFileAlt
          size={30}
          className="hover:text-base ease-in-out duration-200"
        />
        <div className="ml-2 font-rhd font-bold text-white">{fileName}</div>
      </div>
      <div className="flex items-center mr-6">
        <Button
          className="mr-2 hover:bg-base text-base hover:text-secondary-two"
          name="Accept"
          color="secondaryTwo"
          onClick={() => console.log("acc")}
        />
        <Button
          className="hover:bg-base text-base hover:text-secondary-two"
          name="Decline"
          onClick={() => console.log("dec")}
        />
      </div>
    </div>
  );
};
