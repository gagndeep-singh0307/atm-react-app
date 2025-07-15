import { CardType } from './cardTypes'

export interface UserState {
    isLoading: boolean;
    errors: string | null;
    user: UserData | null;
  }
  
  export interface UserData {
    id: string;
    name: string;
    balance: number;
    cardType: CardType;
  }