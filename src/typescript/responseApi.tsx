export interface ContactData {
  asignee: string;
  chats: Array<any>;
  id: number;
  messageReceived: number;
  messageSent: number;
  name: string;
  phoneNumber: string;
  tags: Array<TagsData>;
  type: string;
}

export interface TagsData {
  name: string;
}
