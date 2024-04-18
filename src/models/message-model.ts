export type MessageType = 'message' | 'file' | 'sticker';

export interface FileMessage extends Record<string, string> {
  id: 'number';
  user_id: 'number';
  path: 'string';
  filename: 'string';
  content_type: 'string';
  content_size: 'number';
  upload_date: 'string';
}

export interface RequestMessage extends Record<string, string> {
  content: 'string';
  type: MessageType;
}

export interface ResponseMessage extends Record<string, string | FileMessage | undefined> {
  id: 'string';
  time: 'string';
  user_id: 'string';
  content: 'string';
  type: MessageType;
  file?: FileMessage;
}
