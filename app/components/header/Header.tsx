'use client';

import { ethers } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';

import { useAvpContext } from '@/app/context/AVPContextProvider';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../assets/images/logo.png';

const web3Modal = new Web3Modal({
	// network: 'mainnet', // Optional: if you have a default chain
	cacheProvider: true, // Optional: store user's provider choice
	providerOptions: {}, // Required: provider options
});

type Props = {};

function Header({}: Props) {
	const allowedAdmins = ['0xDB1Ac1d3CaCF1bB80e3597bb0EE3CAF52D266dFa'];
	const pathname = usePathname();
	const { walletAddress, updateWalletAddress, updateProvider } = useAvpContext();

	const [openNav, setOpenNav] = useState(false);
	const [stickyHeader, setStickyHeader] = useState(false);
	const [allowed, setAllowed] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [btnText, setBtnText] = useState('Connect');
	const [showAppList, setShowAppList] = useState(false);
	const [isHomePage, setIsHomePage] = useState(true);

	let closeTimer: NodeJS.Timeout;
	let closeGameTimer: NodeJS.Timeout;

	const connectWallet = useCallback(async () => {
		try {
			const externalProvider = await web3Modal.connect();
			const ethersProvider = new ethers.BrowserProvider(externalProvider);
			const signer = await ethersProvider.getSigner();
			const wallet = await signer.getAddress();

			updateWalletAddress(wallet);
			updateProvider(ethersProvider);

			const walletAllowed = allowedAdmins.includes(wallet);
			setAllowed(walletAllowed);
		} catch (error) {
			console.error('Failed to connect wallet:', error);
		}
	}, []);

	const disconnectWallet = useCallback(async () => {
		await web3Modal.clearCachedProvider();

		updateProvider(null);
		updateWalletAddress(null);
		setAllowed(false);
	}, []);

	const showPunksMenu = () => {
		if (showMenu) {
			setShowMenu(false);
		} else {
			setShowMenu(true);
		}
	};

	const showGamesMenu = () => {
		if (showAppList) {
			setShowAppList(false);
		} else {
			setShowAppList(true);
		}
	};

	useEffect(() => {
		if (web3Modal.cachedProvider) {
			connectWallet();
		}
	}, [connectWallet]);

	useEffect(() => {
		if (walletAddress) {
			const address = walletAddress.slice(0, 5) + '...' + walletAddress.substring(walletAddress.length - 4, walletAddress.length);
			setBtnText(address);
		} else {
			setBtnText('Connect');
		}
	}, [walletAddress]);

	useEffect(() => {
		// if (!this.web3Account && !this.metamaskAddress) return 'Connect';
		// else if (this.web3Account && !this.metamaskAddress) return 'Connect';
		// else {
		// 	return (
		// 		this.metamaskAddress.slice(0, 5) +
		// 		'...' +
		// 		this.metamaskAddress.substring(this.metamaskAddress.length - 4, this.metamaskAddress.length)
		// 	);
		// }

		const handleScroll = () => {
			setStickyHeader(window.scrollY > 20);
		};

		window.addEventListener('scroll', () => handleScroll());

		return () => {
			window.removeEventListener('scroll', () => handleScroll());
		};
	}, []);

	useEffect(() => {
		clearTimeout(closeTimer);
		const closeMenu = () => {
			if (showMenu) {
				setShowMenu(false);
				window.removeEventListener('click', closeMenu);
			}
		};

		if (showMenu) {
			closeTimer = setTimeout(() => {
				window.addEventListener('click', closeMenu);
			}, 200);
		}

		return () => {
			window.removeEventListener('click', closeMenu);
		};
	}, [showMenu]);

	useEffect(() => {
		clearTimeout(closeGameTimer);
		const closeGameMenu = () => {
			if (showAppList) {
				setShowAppList(false);
				window.removeEventListener('click', closeGameMenu);
			}
		};

		if (showAppList) {
			closeGameTimer = setTimeout(() => {
				window.addEventListener('click', closeGameMenu);
			}, 200);
		}

		return () => {
			window.removeEventListener('click', closeGameMenu);
		};
	}, [showAppList]);

	useEffect(() => {
		const url = pathname;
		// Perform actions based on the new URL
		if (url === '/') {
			// Do something specific for the Home page
			setIsHomePage(true);
		} else {
			setIsHomePage(false);
		}
	}, [pathname]);

	return (
		<header
			className={
				'fixed top-0 w-full z-50 ' +
				(openNav || !isHomePage ? 'bg-gradient-to-tr from-color-1 to-color-2 ' : '') +
				(stickyHeader && isHomePage ? 'lockedHeader' : '')
			}
		>
			<div
				className='flex flex-wrap flex-col lg:flex-row mx-auto'
				style={{ maxWidth: '1500px' }}
			>
				<div className='flex flex-row items-center justify-between p-3 lg:p-1'>
					<Link href='/'>
						<Image
							src={Logo}
							width={50}
							height={50}
							alt='AVP'
						/>
					</Link>
					<button
						onClick={() => setOpenNav(!openNav)}
						className='text-white pb-4 cursor-pointer leading-none px-3 py-1 lg:hidden outline-none focus:outline-none content-end ml-auto'
						type='button'
						aria-label='button'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='white'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='feather feather-menu'
						>
							<line
								x1='3'
								y1='12'
								x2='21'
								y2='12'
							></line>
							<line
								x1='3'
								y1='6'
								x2='21'
								y2='6'
							></line>
							<line
								x1='3'
								y1='18'
								x2='21'
								y2='18'
							></line>
						</svg>
					</button>
				</div>
				<div className={'lg:hidden ' + (openNav ? 'flex flex-col max-w-xs' : 'hidden')}>
					{allowed && (
						<Link
							href='/oven'
							className='cursor-pointer text-white hover:text-white font-semibold mx-4'
						>
							ADMIN
						</Link>
					)}
					<Link
						href='/pza-market'
						className='cursor-pointer text-white hover:text-white font-semibold mx-4'
					>
						$PZA MARKET
					</Link>
					<Link
						href='https://opensea.io/collection/averagepunks-'
						rel='noopener noreferrer'
						target='_blank'
						className='cursor-pointer text-white hover:text-white font-semibold mx-4'
					>
						Average Punks
					</Link>
					<Link
						href='https://opensea.io/collection/metaverse-punks-'
						rel='noopener noreferrer'
						target='_blank'
						className='cursor-pointer text-white hover:text-white font-semibold mx-4'
					>
						Metaverse Punks
					</Link>
					<Link
						href='/pza-dash'
						className='cursor-pointer text-white hover:text-white font-semibold mx-4'
					>
						PZA Dash
					</Link>
					{!walletAddress && (
						<Link
							href='#'
							onClick={connectWallet}
							className='px-3 pr-2 rounded cursor-pointer w-max text-white font-semibold my-4 mx-4 connect uppercase'
						>
							{btnText}
						</Link>
					)}
					{walletAddress && (
						<Link
							href='#'
							onClick={disconnectWallet}
							className='px-3 pr-2 rounded cursor-pointer w-max text-white font-semibold my-4 mx-4 connect uppercase'
						>
							{btnText}
						</Link>
					)}
				</div>
				<div className='hidden lg:flex flex-grow items-center'>
					<div className='md:ml-auto md:mr-auto font-4 pt-1 md:pl-32 pl-1 flex flex-wrap items-center md:text-base text-1xl md:justify-center justify-items-start'>
						{allowed && (
							<Link
								href='/oven'
								className='cursor-pointer text-white hover:text-white font-semibold mx-4'
							>
								ADMIN
							</Link>
						)}
						<Link
							href='/pza-market'
							className='cursor-pointer text-white hover:text-white font-semibold mx-4'
						>
							$PZA MARKET
						</Link>
						<Link
							href='/#team'
							className='cursor-pointer text-white hover:text-white font-semibold mx-4'
						>
							TEAM
						</Link>
						<div
							className='mx-4'
							style={{ position: 'relative' }}
						>
							<button
								className='cursor-pointer px-3 border py-1 rounded text-white hover:text-purple-700 hover:bg-white font-semibold uppercase'
								onClick={() => showPunksMenu()}
							>
								Buy a Punk
								<FontAwesomeIcon
									className='ml-1'
									icon={faCaretDown}
								/>
							</button>
							{showMenu && (
								<ul
									className='py-2 absolute top-full w-max'
									style={{ backgroundColor: '#fff', borderRadius: '10px' }}
								>
									<li className='uppercase px-3 py-2 cursor-pointer text-purple-700 hover:text-white hover:bg-purple-700 bg-none'>
										<Link
											href='https://opensea.io/collection/averagepunks-'
											rel='noopener noreferrer'
											target='_blank'
											className='cursor-pointer text-purple-700 hover:text-white font-semibold'
										>
											Average Punks
										</Link>
									</li>
									<li className='uppercase px-3 py-2 cursor-pointer text-purple-700 hover:text-white hover:bg-purple-700 bg-none'>
										<Link
											href='https://opensea.io/collection/metaverse-punks-'
											rel='noopener noreferrer'
											target='_blank'
											className='cursor-pointer text-purple-700 hover:text-white font-semibold'
										>
											Metaverse Punks
										</Link>
									</li>
								</ul>
							)}
						</div>
						<div
							className='mx-4'
							style={{ position: 'relative' }}
						>
							<button
								className='cursor-pointer px-3 border py-1 rounded text-white hover:text-purple-700 hover:bg-white font-semibold uppercase'
								onClick={() => showGamesMenu()}
							>
								Games
								<FontAwesomeIcon
									className='ml-1'
									icon={faCaretDown}
								/>
							</button>
							{showAppList && (
								<ul
									className='py-2 absolute top-full w-max'
									style={{ backgroundColor: '#fff', borderRadius: '10px' }}
								>
									<li className='uppercase px-3 py-2 cursor-pointer text-purple-700 hover:text-white hover:bg-purple-700 bg-none'>
										<Link
											href='/pza-dash'
											className='cursor-pointer text-purple-700 hover:text-white font-semibold'
										>
											PZA Dash
										</Link>
									</li>
								</ul>
							)}
						</div>
						<Link
							href='https://prettyaveragestore.com'
							target='_blank'
							className='cursor-pointer text-white hover:text-white font-semibold mx-4'
						>
							SHOP
						</Link>
					</div>
					<div className='justify-self-end flex flex-row-reverse items-center'>
						{!walletAddress && (
							<Link
								href='#'
								onClick={connectWallet}
								className='px-3 py-1 rounded flex items-center justify-center cursor-pointer text-white connect font-semibold uppercase'
							>
								{btnText}
							</Link>
						)}
						{walletAddress && (
							<Link
								href='#'
								onClick={disconnectWallet}
								className='px-3 py-1 rounded flex items-center justify-center cursor-pointer text-white connect font-semibold uppercase'
							>
								{btnText}
							</Link>
						)}
						<Link
							href='https://twitter.com/AveragePunksNFT'
							rel='noopener noreferrer'
							target='_blank'
							className='px-7 invisible md:visible'
						>
							<svg
								width='30'
								height='17'
								viewBox='0 0 50 40'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
							>
								<path
									data-v-54e46119=''
									d='M15.4528 40C34.0158 40 44.1732 24.6063 44.1732 11.2796C44.1732 10.8465 44.1732 10.4134 44.1536 9.98031C46.122 8.56299 47.8347 6.77166 49.1929 4.74409C47.3819 5.55118 45.4331 6.08268 43.3858 6.33858C45.4724 5.09842 47.0669 3.11023 47.8347 0.74803C45.8858 1.90944 43.7204 2.73622 41.4173 3.18898C39.5669 1.22047 36.9488 0 34.0551 0C28.4842 0 23.9567 4.52756 23.9567 10.0984C23.9567 10.8858 24.0551 11.6536 24.2126 12.4016C15.8268 11.9882 8.38582 7.95276 3.40551 1.85039C2.53937 3.34646 2.04724 5.07874 2.04724 6.92913C2.04724 10.4331 3.83859 13.5237 6.53543 15.3347C4.88189 15.2756 3.32677 14.8228 1.9685 14.0748C1.9685 14.1142 1.9685 14.1536 1.9685 14.2126C1.9685 19.0944 5.45276 23.189 10.0591 24.1142C9.2126 24.3504 8.32677 24.4686 7.40158 24.4686C6.75197 24.4686 6.12204 24.4094 5.51181 24.2913C6.79133 28.3071 10.5315 31.2204 14.9409 31.2992C11.4763 34.0158 7.12599 35.6299 2.40158 35.6299C1.59449 35.6299 0.787401 35.5906 0 35.4921C4.44882 38.3268 9.76378 40 15.4528 40Z'
									fill='white'
								></path>
							</svg>
						</Link>
						<Link
							data-v-54e46119=''
							href='https://discord.gg/avp-871990546615386163'
							rel='noopener noreferrer'
							target='_blank'
							className='invisible md:visible'
						>
							<svg
								data-v-54e46119=''
								width='30'
								height='20'
								viewBox='0 0 25 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									data-v-54e46119=''
									fillRule='evenodd'
									clipRule='evenodd'
									d='M19.98,5.69c-1.68-1.34-4.08-1.71-5.12-1.82h-0.04c-0.16,0-0.31,0.09-0.36,0.24c-0.09,0.23,0.05,0.48,0.28,0.52 c1.17,0.24,2.52,0.66,3.75,1.43c0.25,0.15,0.31,0.49,0.11,0.72c-0.16,0.18-0.43,0.2-0.64,0.08C15.56,5.38,12.58,5.3,12,5.3 S8.44,5.38,6.04,6.86C5.83,6.98,5.56,6.96,5.4,6.78C5.2,6.55,5.26,6.21,5.51,6.06c1.23-0.77,2.58-1.19,3.75-1.43 c0.23-0.04,0.37-0.29,0.28-0.52c-0.05-0.15-0.2-0.24-0.36-0.24H9.14C8.1,3.98,5.7,4.35,4.02,5.69C3.04,6.6,1.09,11.83,1,16.46 c0,0.31,0.08,0.62,0.26,0.87c1.17,1.65,3.71,2.64,5.63,2.78c0.29,0.02,0.57-0.11,0.74-0.35c0.01,0,0.01-0.01,0.02-0.02 c0.35-0.48,0.14-1.16-0.42-1.37c-1.6-0.59-2.42-1.29-2.47-1.34c-0.2-0.18-0.22-0.48-0.05-0.68c0.18-0.2,0.48-0.22,0.68-0.04 c0.03,0.02,2.25,1.91,6.61,1.91s6.58-1.89,6.61-1.91c0.2-0.18,0.5-0.16,0.68,0.04c0.17,0.2,0.15,0.5-0.05,0.68 c-0.05,0.05-0.87,0.75-2.47,1.34c-0.56,0.21-0.77,0.89-0.42,1.37c0.01,0.01,0.01,0.02,0.02,0.02c0.17,0.24,0.45,0.37,0.74,0.35 c1.92-0.14,4.46-1.13,5.63-2.78c0.18-0.25,0.26-0.56,0.26-0.87C22.91,11.83,20.96,6.6,19.98,5.69z M8.89,14.87 c-0.92,0-1.67-0.86-1.67-1.91c0-1.06,0.75-1.92,1.67-1.92c0.93,0,1.67,0.86,1.67,1.92C10.56,14.01,9.82,14.87,8.89,14.87z M15.11,14.87c-0.93,0-1.67-0.86-1.67-1.91c0-1.06,0.74-1.92,1.67-1.92c0.92,0,1.67,0.86,1.67,1.92 C16.78,14.01,16.03,14.87,15.11,14.87z'
									fill='white'
								></path>
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
