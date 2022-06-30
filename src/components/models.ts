export interface Room {
  id: number;
  name: string;
}
export interface User {
  id: number;
  username: string;
}
export interface Chat {
  id: number;
  message: string;
  room_id: number;
  user_id: number;
  type?: string;
}
