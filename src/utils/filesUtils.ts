import { FileType } from '../types/messageTypes';
import { v4 as uuidv4 } from 'uuid';
import useUserIdStore from '../stores/useUserIdStore';

export const parseInputFiles = (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
  const parsedFiles: FileType[] = [];
  if (e.target.files) {
    for (let i = 0; i < e.target.files.length; i++) {
      parsedFiles.push({
        id: uuidv4(),
        destinationId: userId,
        sourceId: useUserIdStore.getState().userId,
        name: e.target.files[i].name,
        size: e.target.files[i].size,
        type: e.target.files[i].type,
        lastModified: e.target.files[i].lastModified,
        outgoing: true,
      } as FileType);
    }
  }
  return parsedFiles;
};
