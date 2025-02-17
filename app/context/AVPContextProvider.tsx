'use client';
import { BrowserProvider } from 'ethers';
import { createContext, useContext, useState } from 'react';

export const AVPContext = createContext({
	walletAddress: '',
	provider: null,
	updateWalletAddress: (newWalletAddress: string | null) => {},
	updateProvider: (newProvider: BrowserProvider | null) => {},
});

export const AVPContextProvider = ({ children }) => {
	const [walletAddress, setWalletAddress] = useState<string | null>('');
	const [provider, setProvider] = useState<BrowserProvider | null>();

	const updateWalletAddress = (newWalletAddress: string) => {
		setWalletAddress(newWalletAddress);
	};

	const updateProvider = (newProvider: BrowserProvider) => {
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
