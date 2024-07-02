// src/utils/storage.ts

import localforage from "localforage";

export const getItem = async <T>(key: string): Promise<T | null> => {
    return localforage.getItem<T>(key);
  };
  
  export const setItem = async <T>(key: string, value: T): Promise<void> => {
    await localforage.setItem(key, value);
  };
  
  export const removeItem = async (key: string): Promise<void> => {
    await localforage.removeItem(key);
  };
  
  export const clear = async (): Promise<void> => {
    await localforage.clear();
  };
  
  export {};  // tha ki file is treated as a module
  