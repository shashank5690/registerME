// src/types/types.ts

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
  
  export type ProfileData = {
    name: string;
    phoneNumber: string;
  };
  