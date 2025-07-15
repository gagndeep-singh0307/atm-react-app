export const CardType = {
    STAR: 'STAR',
    RAINBOW: 'RAINBOW',
    MAESTRO: 'MAESTRO',
    MASTERCARD: 'MASTERCARD',
    PLUS: 'PLUS',
    VISA: 'VISA',
    UNKNOWN: 'UNKNOWN'
} as const;

export type CardType = typeof CardType[keyof typeof CardType];
  
export function getCardTypeIndex(type: CardType): number {
    switch (type) {
        case CardType.STAR:
            return 0;
        case CardType.RAINBOW:
            return 1; 
        case CardType.MAESTRO:
            return 2;
        case CardType.MASTERCARD:
            return 3;
        case CardType.PLUS:
            return 4;
        case CardType.VISA:
            return 5;
        default:
            return -1;
    }
}