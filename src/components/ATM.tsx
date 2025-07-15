import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getUserRequest, resetUserState, updateUserRequest } from '../types/actions';
import { selectUser } from '../store/userReducer';
import { getCardTypeIndex, CardType } from '../types/cardTypes';
import styles from './styles.module.css';
import BaseContainer from './BaseContainer';
import Screen from './Screen';
import StatusBar from './StatusBar';
import ButtonPanel from './ButtonPanel';
import type {ButtonOption} from './ButtonPanel';

const ATM: React.FC = () => {
    const [pin, setPin] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [isPinEntered, setIsPinEntered] = useState<boolean>(false);
    const [isWithdraw, setIsWithdraw] = useState<boolean>(false);
    const [isDeposit, setIsDeposit] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [showInfoScreen, setInfoScreen] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>('');
    
    const dispatch = useAppDispatch();
    const { user: user, isLoading, errors } = useAppSelector(selectUser);

    useEffect(() => {
        if (user && !isLoading) {
            setIsPinEntered(true);
        }
    }, [user, isLoading]);

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!(isDeposit || isWithdraw)){
            onEnterPinClick();
        } else {
            handleAmountSubmit();
        }
    };

    const onEnterPinClick = () => {
        dispatch(resetUserState());
        if (pin.length === 4) {
            dispatch(getUserRequest(pin));
            setError('');
        } else {
            setError('PIN must be 4 digits');
        }
    };

    const resetAmountScreen = () => {
        setIsDeposit(false);
        setIsWithdraw(false);
        setAmount('');
        setError('');
    };

    const resetInfoScreen = () => {
        setInfoScreen(false);
        setInfoMessage('');
    }

    const onWithdrawClick = () => {
        setIsWithdraw(true);
        setIsDeposit(false);
        setAmount('');
        setError('');
        setInfoScreen(true);
        setInfoMessage('Funds successfully withdrawn!');
    };

    const onDepositClick = () => {
        setIsDeposit(true);
        setIsWithdraw(false);
        setAmount('');
        setError('');
        setInfoScreen(true);
        setInfoMessage('Funds successfully deposited!');
    };

    const onBackClick = () => {
        resetAmountScreen();
        resetInfoScreen();
    };

    const onBalanceClick = () => {
        setInfoScreen(true);
        setInfoMessage('');
    }

    const handleAmountSubmit = () => {
        if(!user) return;
        if (isWithdraw) {
            handleWithdraw();
        } else if (isDeposit) {
            handleDeposit();
        }
    };

    const handleDeposit = () => {
        const value = parseFloat(amount);
        if (!user) return;
        
        if (!isNaN(value) && value > 0) {
            const newBalance = user.balance + value;
            dispatch(updateUserRequest(user.id, newBalance));
            resetAmountScreen();
        } else {
            setError('Please enter a valid amount');
        }
    };

    const handleWithdraw = () => {
        const value = parseFloat(amount);
        if (!user) return;
        
        if (!isNaN(value) && value > 0 && value <= user.balance) {
            const newBalance = user.balance - value;
            dispatch(updateUserRequest(user.id, newBalance));
            resetAmountScreen();
        } else if (value > user.balance) {
            setError('Insufficient funds');
        } else {
            setError('Please enter a valid amount');
        }
    };

    const handleUserReset = () => {
        setIsPinEntered(false);
        setPin('');
        setAmount('');
        setError('');
        resetAmountScreen();
        resetInfoScreen();
        dispatch(resetUserState());
    };

    // PIN entry screen
    if (!isPinEntered) {
        const rightOptions: ButtonOption[] = [
            {}, // empty button
            {}, // empty button
            {}, // empty button
            { label: 'Enter PIN', onClick: onEnterPinClick }
        ];

        return (
            <BaseContainer>  
                <StatusBar activeIndex={getCardTypeIndex(user?.cardType ?? CardType.UNKNOWN)} />

                <Screen message='Welcome to the ATM'>
                    <form id='pinForm' onSubmit={handlePinSubmit}>
                        <input
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                        placeholder="****"
                        className={styles.input}
                        />
                    </form>
                </Screen>

                <ButtonPanel side="left" options={[{}, {}, {}, {}]} />
                <ButtonPanel side="right" options={rightOptions} />

                {error && <p className={styles.error}>{error}</p>}
                {errors && <p className={styles.error}>{errors}</p>}
                {isLoading && <p>Verifying PIN...</p>}
            </BaseContainer>
        );
    }

    // Amount entry screen for withdraw or deposit
    if (isWithdraw || isDeposit) {
        const rightOptions: ButtonOption[] = [
            {}, // empty button
            {}, // empty button
            { label: 'Back', onClick: onBackClick },
            { label: 'Enter', onClick: handleAmountSubmit }
        ];

        return (
            <BaseContainer>   
                <StatusBar activeIndex={getCardTypeIndex(user?.cardType ?? CardType.UNKNOWN)} />
                
                <Screen message='Please enter the ammount'>
                    <form id='amountForm' onSubmit={handleAmountSubmit}>
                        <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className={styles.input}
                        />
                    </form>
                </Screen>

                <ButtonPanel side="left" options={[{}, {}, {}, {}]} />
                <ButtonPanel side="right" options={rightOptions} />

                {error && <p className={styles.error}>{error}</p>}
                {errors && <p className={styles.error}>{errors}</p>}
                {isLoading && <p>Processing transaction...</p>}
            </BaseContainer>
        );
    }

    // Info screen for balance
    if (showInfoScreen) {
        const rightOptions: ButtonOption[] = [
            {}, // empty button
            {}, // empty button
            {}, // empty button
            { label: 'Back', onClick: onBackClick }
        ];

        return (
            <BaseContainer>
                <StatusBar activeIndex={getCardTypeIndex(user?.cardType ?? CardType.UNKNOWN)} />
                
                <Screen message={infoMessage}>
                    <div className={styles.promptText}>Current Balance is ${user?.balance.toFixed(2)}</div>
                </Screen>

                <ButtonPanel side="left" options={[{}, {}, {}, {}]} />
                <ButtonPanel side="right" options={rightOptions} />
            </BaseContainer>
        );
    }

    // Main menu screen
    const leftOptions: ButtonOption[] = [
        {}, // empty button
        {}, // empty button
        { label: 'Withdraw', onClick: onWithdrawClick },
        { label: 'Deposit', onClick: onDepositClick }
    ];

    const rightOptions: ButtonOption[] = [
        {}, // empty button
        { label: 'Exit', onClick: handleUserReset },
        { label: 'Balance', onClick: onBalanceClick },
        { label: 'Re-Enter PIN', onClick: handleUserReset }
    ];

    return (
        <BaseContainer>       
            <StatusBar activeIndex={getCardTypeIndex(user?.cardType ?? CardType.UNKNOWN)} />
            
            <Screen message={`Hi ${user?.name}!`}>
                <div className={styles.promptText}>Please make a choice...</div>
            </Screen>

            <ButtonPanel side="left" options={leftOptions} />
            <ButtonPanel side="right" options={rightOptions} />
        </BaseContainer>
    );   
};

export default ATM;