export interface User {
    uid: string;
    email: string;
    favorites?: Array<string>;
    photoURL?: string;
    displayName?: string;
  }