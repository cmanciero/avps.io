'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import Cart from '../components/cart/Cart';
import Product from '../components/product/Product';
import { useAvpContext } from '../context/AVPContextProvider';
import { ABI as ABI_MVP, ADDRESS as ADDRESS_MVP } from '../util/constants/mvp/contract';
import { ABI, ADDRESS } from '../util/constants/pizza/contract';
import { IProduct } from '../util/interfaces';

type Props = {};

enum ToastTypes {
	SUCCESS = 'success',
	ERROR = 'error',
}

const SHOP_URL = 'https://averagepunks.app';

function page({}: Props) {
	const MVP_MULTIPLIER = 300;
	const AVP_MULTIPLIER = 50;
	const { walletAddress, provider } = useAvpContext();

	const [mvpCount, setMvpCount] = useState(0);
	const [avpCount, setAvpCount] = useState(0);
	const [pizzaBalance, setPizzaBalance] = useState(0);
	const [tmpBalance, setTmpBalance] = useState(0);

	const [myItems, setMyItems] = useState(false);
	const [showCart, setShowCart] = useState(false);
	const [cart, setCart] = useState<IProduct[]>([]);
	const [productsBought, setProductsBought] = useState<IProduct[]>([]);
	const [displayProducts, setDisplayProducts] = useState<IProduct[]>([]);
	const [withdrawAllowed, setWithdrawAllowed] = useState(false);
	const [amount, setAmount] = useState(0);
	const [message, setMessage] = useState('');
	const [blockHeight, setBlockHeight] = useState(0);

	const [mvpContract, setMvpContract] = useState<Contract>();
	const [avpContract, setAvpContract] = useState<Contract>();

	const transferModal = () => {};
	const addTokenToWallet = () => {};
	const openWithdrawModal = (action: string) => {};
	const getMyItems = () => {
		getProductsBought();
		setShowCart(false);
		setMyItems(!myItems);
	};
	const toggleCart = () => {
		setMyItems(false);
		setShowCart(!showCart);
	};
	const removeItemFromCart = () => {};
	const finalizeOrder = () => {};
	const emptyCart = () => {};

	const canRate = () => {
		if (walletAddress && pizzaBalance) {
			return true;
		}
		return false;
	};

	const canBuy = (price: number) => {
		if (walletAddress) return true;
		if (pizzaBalance >= price) return false;
		else return true;
	};

	const getProductsBought = async () => {
		try {
			const res = await axios.get(`${SHOP_URL}/ownerOf`, {
				params: {
					wallet: walletAddress,
				},
			});
			setProductsBought(res.data.products);
		} catch (error) {
			showToast(error.message, ToastTypes.ERROR);
		}
	};

	const canWithdraw = async () => {
		try {
			const res = await axios.get(`${SHOP_URL}/canWithdraw`, {
				params: { wallet: walletAddress },
			});

			setWithdrawAllowed(res.data.allowed);
			if (!withdrawAllowed) {
				setBlockHeight(res.data.until);
				showToast(res.data.message, ToastTypes.ERROR);
			}
		} catch (error) {
			console.log('ICI?');
			console.log(error);
			showToast(error.message, ToastTypes.ERROR);
		}
	};

	const addToCart = (product: IProduct) => {
		if (product.unique_buy) {
			const found = cart.find((p) => p.id === product.id);
			if (found !== undefined) return showToast('This item is already in your cart', ToastTypes.ERROR);
		}
		if (product.quantity < 1) {
			return showToast('Not available', ToastTypes.ERROR);
		}
		if (tmpBalance < product.price) return showToast('You need more $PZA', ToastTypes.ERROR);

		setTmpBalance(tmpBalance - product.price);
		cart.push(product);

		showToast('Item added to cart', ToastTypes.SUCCESS);
	};

	const showToast = (message: string, type: ToastTypes) => {
		if (type === ToastTypes.SUCCESS) {
			toast.success(message, {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
				transition: Bounce,
			});
		} else if (type === ToastTypes.ERROR) {
			toast.error(message, {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
				transition: Bounce,
			});
		}
	};

	const getProducts = async () => {
		try {
			const res = await axios.get(`${SHOP_URL}/products`);
			setDisplayProducts(res.data.products);
		} catch (error) {
			showToast('Failed to get products', ToastTypes.ERROR);
		}
	};

	const getPunksCount = async () => {
		const mvp = await mvpContract?.methods.balanceOf(walletAddress).call();
		setMvpCount(mvp);

		await avpContract?.methods
			.balanceOf(walletAddress)
			.call()
			.then((avp: number) => setAvpCount(avp));
	};

	const getPizzaBalance = async () => {
		const res = await axios.get(`${SHOP_URL}/pizzas`, {
			params: {
				wallet: walletAddress,
			},
		});
		const balance = parseInt(res.data.balance);
		setPizzaBalance(balance);
		setTmpBalance(balance);
		setAmount(balance);
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

			const sig = await web3Instance.eth.personal.sign(msg, walletAddress);

			await axios.post(`${SHOP_URL}/pizzas`, {
				signature: sig,
				wallet: walletAddress,
				message: msg,
			});
			localStorage.setItem('last_punked' + walletAddress, Date.now());
			getPizzaBalance();
		} catch (error) {
			showToast('Failure to claim tokens', ToastTypes.ERROR);
		}
	};

	const buyProduct = async (product: IProduct) => {
		const web3 = new Web3(provider);
		if (!withdrawAllowed) {
			const currentBlock = await web3.eth.getBlockNumber();
			showToast(`The marketplace is frozen for ${20 - Math.abs(blockHeight - currentBlock)} blocks`, ToastTypes.ERROR);
		}

		let buyer;
		if (product.wallet.length) {
			buyer = product.wallet;
			if (!web3.utils.isAddress(product.wallet)) {
				return showToast('Invalid address', ToastTypes.ERROR);
			}
		} else {
			buyer = walletAddress;
		}

		const msg = 'Get this item for no gas, you are only exchanging it for PIZZA tokens and signing with this address ' + walletAddress;
		try {
			const sig = await web3.eth.personal.sign(msg, walletAddress);
			// let wallet =  web3.utils.isAddress(product.wallet) ? product.wallet : this.metamaskAddress;
			await axios.post(`${SHOP_URL}/buy`, {
				productId: product.id,
				signature: sig,
				wallet: walletAddress,
				buyer,
				discord: product.discord,
				message: msg,
			});
			getPizzaBalance();
			getProducts();
			// this.getProductsBought();

			showToast('Item purchased', ToastTypes.SUCCESS);
		} catch (error) {
			showToast(error.message, ToastTypes.ERROR);
		}
	};

	useEffect(() => {
		if (walletAddress && provider) {
			const web3Instance = new Web3(provider);

			const MVP_CONTRACT = new web3Instance.eth.Contract(ABI_MVP, ADDRESS_MVP);
			setMvpContract(MVP_CONTRACT);

			const AVP_CONTRACT = new web3Instance.eth.Contract(ABI, ADDRESS);
			setAvpContract(AVP_CONTRACT);

			getProducts();
			getPizzaBalance();
			claimTokens();
			canWithdraw();
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
							<p className='text-xl md:text-3xl lg:text-5xl font-semibold text-purple-600'>{pizzaBalance}</p>
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
								buy={buyProduct}
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
				{!myItems && !showCart && (
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
				)}
			</div>
			<ToastContainer />
		</section>
	);
}

export default page;
