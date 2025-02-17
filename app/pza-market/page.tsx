'use client';
import axios from 'axios';
import { Contract } from 'ethers';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

import Cart from '../components/cart/Cart';
import Product from '../components/product/Product';
import { useAvpContext } from '../context/AVPContextProvider';
import { ABI, ADDRESS } from '../util/constants/contract.js';
import { ABI as ABI_MVP, ADDRESS as ADDRESS_MVP } from '../util/constants/mvp/contract.js';
import { IProduct } from '../util/interfaces';

type Props = {};

const SHOP_URL = 'https://averagepunks.app';

function page({}: Props) {
	const MVP_MULTIPLIER = 300;
	const AVP_MULTIPLIER = 50;
	const { walletAddress, provider } = useAvpContext();

	const [mvpCount, setMvpCount] = useState(0);
	const [avpCount, setAvpCount] = useState(0);
	const [balance, setBalance] = useState(0);
	const [pizzaBalance, setPizzaBalance] = useState(0);

	const [myItems, setMyItems] = useState();
	const [showCart, setShowCart] = useState(false);
	const [cart, setCart] = useState<IProduct[]>([]);
	const [productsBought, setProductsBought] = useState<IProduct[]>([]);
	const [displayProducts, setDisplayProducts] = useState<IProduct[]>([]);
	const [showErrorMessage, setShowErrorMessage] = useState<string>();
	const [amount, setAmount] = useState(0);
	const [message, setMessage] = useState('');

	const [mvpContract, setMvpContract] = useState<Contract>();
	const [avpContract, setAvpContract] = useState<Contract>();

	const transferModal = () => {};
	const addTokenToWallet = () => {};
	const openWithdrawModal = (action: string) => {};
	const getMyItems = () => {
		// !myItems ? getProductsBought() : '';
		// 						myItems = !myItems;
		// 						showCart = false;
	};
	const toggleCart = () => {};
	const removeItemFromCart = () => {};
	const finalizeOrder = () => {};
	const emptyCart = () => {};
	let tmpBalance = 0;

	const canRate = () => {
		if (walletAddress && pizzaBalance) {
			return true;
		}
		return false;
	};

	const canBuy = (price: number) => {
		if (walletAddress) return false;
		if (pizzaBalance >= price) return true;
		else return false;
	};

	const addToCart = (product: IProduct) => {
		console.log(product);
	};

	const getProducts = async () => {
		try {
			const res = await axios.get(`${SHOP_URL}/products`);
			setDisplayProducts(res.data.products);
			console.log(res.data.products);
		} catch (error) {
			setShowErrorMessage('Failed to get products');
		}
	};

	const getPunksCount = async () => {
		setMvpCount(await mvpContract?.methods.balanceOf(walletAddress).call());
		setAvpCount(await avpContract?.methods.balanceOf(walletAddress).call());
	};

	const getPizzaBalance = async () => {
		const res = await axios.get(`${SHOP_URL}/pizzas`, {
			params: {
				wallet: walletAddress,
			},
		});
		setPizzaBalance(res.data.balance);
		tmpBalance = pizzaBalance;
		setAmount(pizzaBalance);
	};

	const claimTokens = async () => {
		// const web3 = this.web3Shop;
		const oneDayMs = 86400000;
		let last_claim = localStorage.getItem('last_punked' + walletAddress);
		if (last_claim && last_claim > Date.now() - oneDayMs) {
			console.log('claimed less than 24h ago');
			return;
		}

		try {
			const msg = 'Starting a session with this address ' + walletAddress;
			setMessage(msg);
			const web3Instance = new Web3(provider);

			const sig = await web3Instance.eth.personal.sign(message, walletAddress);

			await axios.post(`${SHOP_URL}/pizzas`, {
				signature: sig,
				wallet: walletAddress,
				message: msg,
			});
			localStorage.setItem('last_punked' + walletAddress, Date.now());
			getPizzaBalance();
		} catch (error) {
			setShowErrorMessage('Failure to claim tokens');
		}
	};

	useEffect(() => {
		if (walletAddress && provider) {
			console.log(walletAddress);

			const web3Instance = new Web3(provider);

			const MVP_CONTRACT = new web3Instance.eth.Contract(ABI_MVP, ADDRESS_MVP);
			setMvpContract(MVP_CONTRACT);
			const AVP_CONTRACT = new web3Instance.eth.Contract(ABI, ADDRESS);
			setAvpContract(AVP_CONTRACT);

			getProducts();
			getPizzaBalance();
			claimTokens();
		}
	}, [walletAddress, provider]);

	useEffect(() => {
		if (avpContract && mvpContract) {
			getPunksCount();
		}
	}, [avpContract, mvpContract]);

	return (
		<section className='bg-gray-100 pb-8 pt-36'>
			<div
				className='container mx-auto px-8'
				style={{ maxWidth: '1500px' }}
			>
				<div className='grid gap-3 grid-cols-1 lg:grid-cols-5'>
					<div className='shadow-xl bg-white p-4 rounded-lg flex-col items-center justify-center'>
						<p className='text-xs md:text-sm uppercase text-purple-600 px-2 py-1 bg-white -mx-4 rounded-t'>Metaverse Punk</p>
						<div className='flex items-center text-purple-600 mt-2'>
							<p className='text-xl md:text-3xl lg:text-5xl font-semibold'>{mvpCount}</p>
							<span className='text-xl md:text-3xl lg:text-5xl mx-2'>|</span>
							<p className='text-base font-semibold'>{mvpCount * MVP_MULTIPLIER} $PZA/DAY</p>
						</div>
					</div>
					<div className='shadow-xl bg-white p-4 rounded-lg flex-col items-center justify-center'>
						<p className='text-xs md:text-sm uppercase text-purple-600 px-2 py-1 bg-white -mx-4 rounded-t'>Average Punk</p>
						<div className='flex items-center text-purple-600 mt-2'>
							<p className='text-xl md:text-3xl lg:text-5xl font-semibold'>{avpCount}</p>
							<span className='text-xl md:text-3xl lg:text-5xl mx-2'>|</span>
							<p className='text-base font-semibold'>{avpCount * AVP_MULTIPLIER} $PZA/DAY</p>
						</div>
					</div>
					<div className='shadow-xl bg-white p-4 rounded-lg flex-col items-center justify-center'>
						<p className='text-xs md:text-sm uppercase text-purple-600 px-2 py-1 bg-white -mx-4 rounded-t'>My $PZA balance</p>
						<div className='flex items-center justify-between mt-2'>
							<p className='text-xl md:text-3xl lg:text-5xl font-semibold text-purple-600'>{balance}</p>
						</div>
					</div>
					<div className='shadow-xl bg-white p-4 rounded-lg flex-col items-center justify-center'>
						<p className='text-xs md:text-sm uppercase text-purple-600 px-2 py-1 bg-white -mx-4 rounded-t'>OFFCHAIN</p>
						<div className='flex justify-between mt-3 w-full'>
							<button
								onClick={transferModal}
								disabled={!walletAddress || (walletAddress && pizzaBalance === 0)}
								className={
									'border border-purple-300 bg-white px-4 py-2 text-purple-600 uppercase font-semibold rounded mr-2 ' +
									(walletAddress && pizzaBalance > 0 ? 'hover:bg-purple-600 hover:text-white cursor-pointer' : 'cursor-default')
								}
							>
								Transfer
							</button>
						</div>
					</div>
					<div className='shadow-xl bg-white p-4 rounded-lg flex-col items-center justify-center'>
						<div className='flex justify-between items-center'>
							<p className='text-xs md:text-sm uppercase text-purple-600 px-2 py-1 bg-white -mx-4 rounded-t'>ONCHAIN</p>
							{walletAddress && (
								<button
									className='text-xs text-purple-600 underline uppercase'
									onClick={addTokenToWallet}
								>
									Add $PZA to metamask
								</button>
							)}
						</div>

						<div className='flex justify-between mt-3 w-full'>
							<button
								disabled={!walletAddress}
								onClick={() => openWithdrawModal('deposit')}
								className={
									'border border-purple-300 bg-white px-4 py-2 text-purple-600 uppercase font-semibold rounded ' +
									(walletAddress && pizzaBalance > 0 ? 'hover:bg-purple-600 hover:text-white cursor-pointer' : 'cursor-default')
								}
							>
								Deposit
							</button>
							<button
								disabled={!walletAddress}
								onClick={() => openWithdrawModal('withdraw')}
								className={
									'border border-purple-300 bg-white px-4 py-2 text-purple-600 uppercase font-semibold rounded ' +
									(walletAddress && pizzaBalance > 0 ? 'hover:bg-purple-600 hover:text-white cursor-pointer' : 'cursor-default')
								}
							>
								Withdraw
							</button>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-between h-16 w-full rounded mt-12'>
					<div className='flex items-center justify-center'>
						<button
							disabled={!walletAddress}
							onClick={() => getMyItems()}
							className={
								'text-xs md:text-base border bg-white border-purple-300 px-4 py-2 text-purple-600 uppercase font-semibold rounded mr-2 ' +
								(walletAddress ? 'hover:bg-purple-600 hover:text-white cursor-pointer' : 'cursor-default')
							}
						>
							{!myItems ? 'My items' : 'Back to shop'}
						</button>
						{!showCart && (
							<button
								disabled={!walletAddress}
								className={
									'text-xs md:text-base border bg-white px-4 border-purple-300 py-2 text-purple-600 uppercase font-semibold rounded ' +
									(walletAddress ? 'hover:bg-purple-600 hover:text-white cursor-pointer' : 'cursor-default')
								}
								onClick={toggleCart}
							>
								Checkout {cart.length > 0 ? cart.length : ''}
							</button>
						)}
					</div>
					{/* <div v-show="!showCart && !myItems" className="relative inline-block text-left">
						<button-with-dropdown :sort="priceOrder" @sortPrice="sortPrice" @include-past="includePast" />
					</div> */}
				</div>
				{myItems && (
					<div
						className={
							productsBought && productsBought.length
								? 'mt-12 grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
								: 'min-h-screen'
						}
					>
						{!productsBought ||
							(productsBought.length === 0 && (
								<p className='mt-8 text-xl text-purple-600 font-semibold'>You didn't purchase anything yet.</p>
							))}
						{productsBought.map((product) => (
							<Product
								key={product.id}
								product={product}
								canRate={canRate}
								canBuy={false}
								hideButton={true}
							/>
						))}
					</div>
				)}
				{showCart && (
					<Cart
						toggle={toggleCart}
						removeItem={removeItemFromCart}
						finalizeOrder={finalizeOrder}
						emptyCart={emptyCart}
						wallet={walletAddress}
						cart={cart}
					/>
				)}
				<div className='mt-12 grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{displayProducts.map((product: IProduct) => (
						<Product
							key={product.id}
							product={product}
							canRate={canRate}
							canBuy={canBuy(product.price)}
							buy={addToCart}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export default page;
