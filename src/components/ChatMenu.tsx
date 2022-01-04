import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { ChatMessageModel } from '../types/models';
import { Button } from './Button';
import { ChatMessage } from './ChatMessage';
import { InputField } from './InputField';
import { MenuWindow } from './MenuWindow';
import { v4 as uuidv4 } from 'uuid';
import { getChatCurrTime } from '../utils/chatUtils';

interface ChatMenuProps {}

export const ChatMenu: React.FC<ChatMenuProps> = () => {
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessageModel[]>([]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [chatMessages]);

  const chatSendMessageHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (inputText === '') {
      return;
    }
    const newChatMsg: ChatMessageModel = { date: getChatCurrTime(), msgContent: inputText };
    setChatMessages([...chatMessages, newChatMsg]);
    setInputText('');
  };

  return (
    <MenuWindow menuTitle="Chat:" menuClassName="w-1/4" ml="ml-4" mr="mr-8">
      <div className="flex flex-col h-full overflow-hidden">
        {chatMessages.length > 0 ? (
          <>
            <div className="flex-grow break-words overflow-y-auto">
              {chatMessages.map((msg) => {
                return <ChatMessage key={uuidv4()} date={msg.date} msgContent={msg.msgContent} />;
              })}
              <div ref={messagesEndRef} />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center text-center w-full flex-grow ">
            <div className="text-secondary-two font-rhd font-bold">No Messages</div>
          </div>
        )}
        <form className="flex bg-primary items-end justify-between mx-3 my-3 ">
          <InputField
            placeholder="message"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            color="secondary"
            className="w-full "
          />
          <Button
            name="Send"
            color="secondaryTwo"
            onClick={(e) => chatSendMessageHandler(e)}
            className="ml-3"
          />
        </form>
      </div>
    </MenuWindow>
  );
};
