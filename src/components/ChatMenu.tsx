import { useState } from "react";
import { Button } from "./Button";
import { ChatMessage } from "./ChatMessage";
import { InputField } from "./InputField";
import { MenuWindow } from "./MenuWindow";

interface ChatMenuProps {}

export const ChatMenu: React.FC<ChatMenuProps> = ({}) => {
  const [inputText, setInputText] = useState("");

  const chatMessages = true;

  const inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  return (
    <MenuWindow menuTitle="Chat:" menuClassName="w-1/4" ml="ml-4" mr="mr-8">
      <div className="flex flex-col h-full">
        {chatMessages ? (
          <div className="flex-grow w-[calc(100%-1rem)]">
            <ChatMessage
              time="19:24"
              msgContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus eleifend ex, id pellentesque nunc pretium in. Suspendisse nec cursus est, eu ornare quam. Praesent congue convallis lacus sed rhoncus. Nam ex ante, pulvinar et velit sed, tristique aliquam elit. Vestibulum arcu dui, rhoncus quis urna a, egestas tincidunt turpi"
            />
            <ChatMessage
              time="19:26"
              msgContent="This is another message sent just after the last one"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center text-center w-full flex-grow ">
            <div className="text-secondary-two font-rhd font-bold text-base">
              No Messages
            </div>
          </div>
        )}
        <div className="flex bg-primary justify-between items-end ml-3 my-3">
          <InputField
            placeholder="message"
            value={inputText}
            onChange={(e) => inputTextHandler(e)}
            size="big"
            color="secondary"
          />
          <Button
            name="Send"
            color="secondaryTwo"
            size="medium"
            onClick={() => console.log("send")}
            className="mr-3"
          />
        </div>
      </div>
    </MenuWindow>
  );
};
