'use client';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Web3 from 'web3';

import { useAvpContext } from '@/app/context/AVPContextProvider';
import { SHOP_URL, ToastTypes } from '@/app/pza-market/page';
import { IProduct } from '@/app/util/interfaces';

type Props = {
	toggle: () => void;
	removeItem: (product: IProduct, index: number) => void;
	finalizeOrder: () => void;
	emptyCart: () => void;
	wallet: string;
	cartTotal: number;
	cart: IProduct[];
};

function Cart(props: Props) {
	const { toggle, cart, emptyCart, wallet, removeItem, finalizeOrder, cartTotal } = props;
	const { walletAddress, provider } = useAvpContext();

	const [discord, setDiscord] = useState('');
	const [receiver, setReceiver] = useState('');
	const [agreedDisclaimer, setAgreedDisclaimer] = useState(false);

	const checkout = async () => {
		const web3 = new Web3(provider);
		if (!discord) {
			showToast('Please fill in your discord', ToastTypes.ERROR);
		}
		if (!web3.utils.isAddress(receiver)) {
			return showToast('Invalid address', ToastTypes.ERROR);
		}
		const msg = 'Buy this item for no gas, you are only paying in PIZZA tokens and signing with this address ' + wallet;
		try {
			const sig = await web3.eth.personal.sign(msg, wallet);
			const productIds = cart.map((e) => e.id);
			console.log({ productIds: productIds });
			// let wallet =  web3.utils.isAddress(product.wallet) ? product.wallet : this.metamaskAddress;
			await axios.post(`${SHOP_URL}/buy`, {
				productIds,
				buyer: receiver,
				discord: discord,
				signature: sig,
				wallet: wallet,
				message: msg,
			});

			// Finalize order to parent
			finalizeOrder();
		} catch (error) {
			showToast(error.message, ToastTypes.ERROR);
		}
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

	const handleWalletChange = (event: ChangeEvent<HTMLInputElement>) => {
		setReceiver(event.target.value);
	};

	const handleDiscordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setDiscord(event.target.value);
	};

	const handleDisclaimerChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAgreedDisclaimer(event.target.checked);
	};

	useEffect(() => {
		setReceiver(walletAddress);
	}, []);

	return (
		<div className='min-h-screen'>
			{cart.length === 0 && (
				<div>
					<p className='mt-8 text-xl text-purple-600 font-semibold'>You don't have anything in your cart yet.</p>
					<a
						href='#'
						onClick={toggle}
						className='flex font-semibold text-indigo-600 text-sm mt-10'
					>
						<svg
							className='fill-current mr-2 text-indigo-600 w-4'
							viewBox='0 0 448 512'
						>
							<path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
						</svg>
						Continue Shopping
					</a>
				</div>
			)}
			{cart.length > 0 && (
				<div className='flex flex-wrap shadow-md my-10'>
					<div className='w-full lg:w-3/4 bg-white px-10 py-10'>
						<div className='flex justify-between border-b border-purple-300 pb-8'>
							<h1 className='font-semibold text-2xl text-purple-600'>Shopping Cart</h1>
							<h2 className='font-semibold text-2xl text-purple-500'>
								{cart.length} {cart.length === 1 ? 'Item' : 'Items'}
							</h2>
						</div>
						<div className='flex mt-10 mb-5'>
							<div className='flex items-center justify-between w-full'>
								<h3 className='font-semibold text-purple-500 text-xs uppercase w-2/5'>Details</h3>

								<h3
									className='
                  font-semibold
                  text-center text-purple-500 text-xs
                  uppercase
                '
								>
									Price
								</h3>
							</div>
						</div>
						{cart.map((product, i) => (
							<div
								key={`${product.id}-${i}`}
								className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'
							>
								<div className='flex w-2/5'>
									<div className='w-20'>
										<img
											className='h-24'
											src={product.img}
											alt=''
										/>
									</div>
									<div className='flex flex-col justify-between ml-4 flex-grow'>
										<span className='font-bold text-sm text-purple-600'>{product.name}</span>
										<a
											onClick={() => removeItem(product, i)}
											href='#'
											className='font-semibold hover:text-red-500 text-gray-500 text-xs'
										>
											Remove
										</a>
									</div>
								</div>
								<div className='flex flex-row-reverse w-3/5'>
									<span className='text-center font-semibold text-sm text-purple-600'>{product.price} $PZA</span>
								</div>
							</div>
						))}
						<div className='flex justify-between items-center'>
							{/* @click.prevent="toggleCart" */}
							<a
								onClick={toggle}
								href='#'
								className='flex font-semibold text-indigo-600 text-sm mt-10'
							>
								<svg
									className='fill-current mr-2 text-indigo-600 w-4'
									viewBox='0 0 448 512'
								>
									<path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
								</svg>
								Continue Shopping
							</a>
							{/* @click.prevent="$emit('emptyCart');toggleCart();" */}
							<a
								onClick={emptyCart}
								href='#'
								className='flex font-semibold text-red-600 text-sm mt-10'
							>
								Remove everything from cart
							</a>
						</div>
					</div>

					<div
						id='summary'
						className='w-full lg:w-1/4 px-8 py-10 bg-purple-600 text-white'
					>
						<h1 className='font-semibold text-2xl border-b pb-8'>Order Summary</h1>
						<div className='flex justify-between mt-10 mb-5'>
							<span className='font-semibold text-sm uppercase'>
								{cart.length} {cart.length === 1 ? 'Item' : 'Items'}
							</span>
							<span className='font-semibold text-sm'>{cartTotal} $PZA total</span>
						</div>

						<div className='py-10'>
							<label
								htmlFor='promo'
								className='font-semibold inline-block mb-3 text-sm uppercase'
							>
								Discord ID
							</label>{' '}
							{discord}
							<p className='text-sm mb-3'>This can be used to contact you and it is attached the to presale spot</p>
							<input
								type='text'
								value={discord}
								onChange={handleDiscordChange}
								placeholder='Enter your discord id'
								className='p-2 text-sm text-black w-full rounded focus:outline-none'
							/>
						</div>
						<div className='pb-10'>
							<label className='font-semibold inline-block mb-3 text-sm uppercase'>Ethereum wallet</label>
							<p className='text-sm mb-3'>Default to the connected account if none provided</p>
							<input
								value={receiver}
								onChange={handleWalletChange}
								type='text'
								placeholder='Enter your wallet'
								className='p-2 text-sm text-black w-full rounded focus:outline-none'
							/>
						</div>

						<p className='mt-4 text-white text-xs'>
							By selecting this box, I affirm that these presale spots are NOT financial advice whatsoever. I also understand the projects
							represented in these presale spots are not guaranteed to be successful or mint out. I acknowledge I need to do my own research
							before minting the project, and will not hold the Average Punks or anyone in the community accountable for my decision to
							redeem the presale spot(s) held in this cart. I further understand there will be no reimbursements of PZA for my purchases.
						</p>
						<input
							type='checkbox'
							checked={agreedDisclaimer}
							onChange={handleDisclaimerChange}
						/>
						<div className='border-t mt-8'>
							<div className='flex font-semibold justify-between py-6 text-sm uppercase'>
								<span>Total cost</span>
								<span>{cartTotal} $PZA</span>
							</div>
							<button
								disabled={!agreedDisclaimer}
								onClick={checkout}
								className={
									'rounded font-semibold py-3 text-sm text-white uppercase w-full ' +
									(agreedDisclaimer ? 'bg-green-500 hover:bg-green-600' : 'cursor-default')
								}
							>
								Finalize order
							</button>
						</div>
					</div>
				</div>
			)}
			<ToastContainer />
		</div>
	);
}

export default Cart;
