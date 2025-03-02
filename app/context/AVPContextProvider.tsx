'use client';
import { createContext, useContext, useState } from 'react';
import Providers from 'web3';

export const AVPContext = createContext({
	walletAddress: '',
	provider: null,
	updateWalletAddress: (newWalletAddress: string | null) => {},
	updateProvider: (newProvider: Providers | null) => {},
});

export const AVPContextProvider = ({ children }) => {
	const [walletAddress, setWalletAddress] = useState<string | null>('');
	const [provider, setProvider] = useState<Providers | null>();

	const updateWalletAddress = (newWalletAddress: string) => {
		setWalletAddress(newWalletAddress);
	};

	const updateProvider = (newProvider: Providers) => {
		setProvider(newProvider);
	};

	const value = {
		walletAddress,
		provider,
		updateWalletAddress,
		updateProvider,
	};

	return <AVPContext.Provider value={value}>{children}</AVPContext.Provider>;
};

export const useAvpContext = () => {
	const context = useContext(AVPContext);
	if (context === undefined) {
		throw new Error('useAvpContext must be used within a AVPContextProvider');
	}
	return context;
};
