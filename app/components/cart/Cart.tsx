'use client';
import { useState } from 'react';

import { IProduct } from '@/app/util/interfaces';

type Props = {
	toggle: () => void;
	removeItem: () => void;
	finalizeOrder: () => void;
	emptyCart: () => void;
	wallet: string;
	cart: IProduct[];
};

function Cart({ toggle, cart }: Props) {
	const [discord, setDiscord] = useState('');
	const [receiver, setReceiver] = useState('');
	const [agreedDisclaimer, setAgreedDisclaimer] = useState(false);
	const [cartTotal, setCartTotal] = useState(0);

	const finalizeOrder = () => {};
	return (
		<div className='min-h-screen'>
			{cart.length === 0 && (
				<div>
					<p className='mt-8 text-xl text-purple-600 font-semibold'>You don't have anything in your cart yet.</p>
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
				</div>
			)}
			{cart.length > 0 && (
				<>
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
							{cart.map((product) => (
								<div
									key={product.id}
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
											{/* @click.prevent=" $emit('removeItem', { index: i, price: product.price }) */}
											<a
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
									href='#'
									className='flex font-semibold text-red-600 text-sm mt-10'
								>
									Remove everything from cart
								</a>
							</div>
						</div>
					</div>

					<div
						id='summary'
						className='w-full lg:w-1/4 px-8 py-10 bg-purple-600 text-white'
					>
						<h1 className='font-semibold text-2xl border-b pb-8'>Order Summary</h1>
						<div className='flex justify-between mt-10 mb-5'>
							<span className='font-semibold text-sm uppercase'>
								{cart.length}
								{cart.length === 1 ? 'Item' : 'Items'}
							</span>
							<span className='font-semibold text-sm'>{cartTotal} $PZA total</span>
						</div>

						<div className='py-10'>
							<label
								htmlFor='promo'
								className='font-semibold inline-block mb-3 text-sm uppercase'
							>
								Discord ID
							</label>
							{discord}
							<p className='text-sm mb-3'>This can be used to contact you and it is attached the to presale spot</p>
							<input
								type='text'
								placeholder='Enter your discord id'
								className='p-2 text-sm text-black w-full rounded focus:outline-none'
							/>
						</div>
						<div className='pb-10'>
							<label className='font-semibold inline-block mb-3 text-sm uppercase'>Ethereum wallet</label>
							<p className='text-sm mb-3'>Default to the connected account if none provided</p>
							<input
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
						<input type='checkbox' />
						<div className='border-t mt-8'>
							<div className='flex font-semibold justify-between py-6 text-sm uppercase'>
								<span>Total cost</span>
								<span>{cartTotal} $PZA</span>
							</div>
							<button
								disabled={agreedDisclaimer}
								onClick={finalizeOrder}
								className={
									'rounded font-semibold py-3 text-sm text-white uppercase w-full ' +
									(agreedDisclaimer ? 'bg-green-500 hover:bg-green-600' : 'cursor-default')
								}
							>
								Finalize order
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Cart;
