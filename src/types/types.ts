
export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    roleType: 'user' | 'admin';
  }
  
  export type LoginData = {
    email: string;
    password: string;
    roleType: 'user' | 'admin';
  };
  
  export interface ProfileData {
    name: string;
    phoneNumber: string;
    email: string;
    roleType: 'user' | 'admin';
    password: string;
  }