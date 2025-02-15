'use client';
import { useState } from 'react';

export interface IProductLinks {
	twitter: string;
	discord: string;
	website: string;
	instagram: string;
}
export interface IProduct {
	id?: string;
	name: string;
	description: string;
	links: IProductLinks;
	price: number;
	total_supply: number;
	quantity: number;
	unique_buy: boolean;
	sold: boolean;
	img: string;
}

export default function Blockchain() {
	const newProduct: IProduct = {
		name: '',
		description: '',
		links: {
			twitter: '',
			discord: '',
			website: '',
			instagram: '',
		},
		img: '',
		price: 0,
		total_supply: 0,
		quantity: 0,
		unique_buy: true,
		sold: false,
	};
	const [products, setProducts] = useState<IProduct[]>([]);
	const [totalPizzas, setTotalPizzas] = useState(0);
	const [totalToBuy, setTotalToBuy] = useState(0);
	const [create, setCreate] = useState(false);
	const [edit, setEdit] = useState(false);
	const [view, setView] = useState(false);
	const [product, setProduct] = useState<IProduct>(newProduct);
	const [metamaskAddress, setMetamaskAddress] = useState();
	const [allowed, setAllowed] = useState(false);

	const handleViewProductsClick = () => {
		setCreate(false);
		setEdit(false);
		setView(false);
	};

	const handleCreateProductClick = () => {
		setCreate(true);
		setView(false);
	};

	const handleUniqueBuyClick = () => {
		// unique_buy = !unique_buy
	};

	const handleHideProduct = (product: IProduct) => {
		console.log('hide this: ', product);
	};

	const handleProductActionClick = () => {};

	const handleProductSoldClick = () => {
		//@click="product.sold = !product.sold"
	};

	const handleGetUsers = (product: IProduct) => {
		console.log('get users for ', product);
	};

	const handleInitializeEdit = (product: IProduct) => {
		console.log('edit this: ', product);
	};

	const handleDeleteProduct = (product: IProduct) => {
		console.log('delete this: ', product);
	};

	return (
		<div className='bg-gray-100 -mt-3 pt-8 pb-12'>
			{metamaskAddress && allowed && (
				<div className='min-h-screen container mx-auto mt-24 text-purple-600'>
					<h1 className='text-xl'>
						Number of products for sale:
						{products && products.length ? products.length : 0}
					</h1>
					<h1 className='text-xl'>Total existing $PZA in the ecosystem: {totalPizzas} $PZA</h1>
					<h1 className='text-xl'>Total spendable $PZA in the ecosystem: {totalToBuy} $PZA</h1>
					<div className='flex'>
						<button
							className='bg-blue-600 text-white px-4 py-2 uppercase mt-2'
							onClick={handleViewProductsClick}
						>
							View products
						</button>
						<button
							className='ml-4 bg-green-600 text-white px-4 py-2 uppercase mt-2'
							onClick={handleCreateProductClick}
						>
							Create product
						</button>
					</div>
					{(create || edit) && (
						<div className='flex flex-col max-w-xl mt-8 bg-white p-8'>
							<h1 className='text-purple-600 uppercase text-xl my-4'>create product</h1>
							<p className='text-purple-600'>Project name</p>
							<input
								v-model='product.name'
								className='my-2 p-2 rounded text-black border'
								type='text'
								placeholder='project name'
							/>
							<p className='text-purple-600'>1 liner about the item</p>
							<input
								v-model='product.description'
								className='mt-2 mb-3 p-2 rounded text-black border'
								type='text'
								placeholder='description'
							/>
							<p className='text-purple-600'>
								Image Link - be mindfull of the image size
								<br />
								<a
									href='https://imgbb.com/'
									target='_blank'
									className='bg-green-600 text-white text-xs px-4 py-1'
								>
									Upload here and get link (no need for an account)
								</a>
							</p>
							<input
								v-model='product.img'
								className='my-2 p-2 rounded text-black border'
								type='text'
								placeholder='image link'
							/>
							<p className='text-purple-600'>Website - optional</p>
							<input
								v-model='product.links.website'
								className='my-2 p-2 rounded text-black border'
								type='text'
								placeholder='website'
							/>
							<p className='text-purple-600'>Twitter - optional</p>
							<input
								v-model='product.links.twitter'
								className='my-2 p-2 rounded text-black border'
								type='text'
								placeholder='twitter'
							/>
							<p className='text-purple-600'>Discord - optional</p>
							<input
								v-model='product.links.discord'
								className='my-2 p-2 rounded text-black border'
								type='text'
								placeholder='discord'
							/>
							<p className='text-purple-600'>Instagram - optional</p>
							<input
								v-model='product.links.instagram'
								className='my-2 p-2 rounded text-black border'
								type='text'
								placeholder='instagram'
							/>
							<p className='text-purple-600'>Price</p>
							<input
								v-model='product.price'
								className='my-2 p-2 rounded text-black border'
								type='number'
								placeholder='price'
								min='1'
							/>
							{edit && (
								<>
									<p className='text-purple-600'>Total supply</p>
									<input
										value={product.total_supply}
										className='my-2 p-2 rounded text-black border'
										type='number'
										placeholder='total supply'
										min='1'
									/>
								</>
							)}
							<p className='text-purple-600'>Quantity</p>
							<input
								v-model='product.quantity'
								className='my-2 p-2 rounded text-black border'
								type='number'
								placeholder='quantity'
								min='1'
							/>
							<p className='text-purple-600'>This item can only be acquired once</p>
							<div className='flex items-center'>
								<input
									className='p-4 h-12 mr-4'
									type='checkbox'
									checked={product?.unique_buy}
									onClick={handleUniqueBuyClick}
								/>

								{product.unique_buy ? 'Yes, only once' : 'No, multiple times'}
							</div>
							{edit && (
								<>
									<hr className='my-4' />
									<div className='flex flex-col'>
										<p className='text-purple-600'>Mark as sold will hide the item from the shop for the users</p>
										<input
											className='p-4 h-12 mr-4'
											type='checkbox'
											checked={product.sold}
											onClick={handleProductSoldClick}
										/>

										{product.sold ? 'Yes, Mark as sold' : 'Unmark from sold, let users buy'}
									</div>
								</>
							)}

							<button
								className='mt-4 bg-green-600 text-white uppercase font-semibold py-2 px-4'
								onClick={handleProductActionClick}
							>
								{create ? 'Create' : 'Edit'}
							</button>
						</div>
					)}
					{view && (
						<div>
							{products && products.length === 0 && (
								<h1 className='mt-12 uppercase text-2xl text-purple-600'>No products in the database yet</h1>
							)}
							{products && products.length > 0 && (
								<>
									<h1 className='mt-12 uppercase text-2xl text-purple-600'>
										Mark as sold can be used to hide the product from the shop for the users
									</h1>
									<div className='mt-12 mx-auto w-full'>
										<div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
											{products.map((product) => (
												<div
													key={product.name}
													className='bg-gray-900 bg-opacity-90 rounded-lg'
												>
													{product.img && (
														<img
															className='rounded-t-lg h-auto min-h-72 max-h-72 w-full object-cover'
															style={{ minHeight: '288px' }}
														/>
													)}
													<div className='p-4'>
														<div className='flex flex-row items-center'>
															<div className='flex-1 text-left'>
																<div className='flex flex-col'>
																	<p className='text-white no-underline text-md font-bold'>{product.name}</p>
																	<p className='text-xs text-gray-400 font-bold'>
																		{product.quantity} left out of {product.total_supply}
																	</p>
																</div>
															</div>
															<div className='text-right'>
																<p className='flex flex-col -mt-3'>
																	<span className='text-gray-400'>PRICE</span>
																	<span className='font-bold text-white'>{product.price} $PZA</span>
																</p>
															</div>
														</div>
													</div>
													<div className='text-sm text-white text-center mb-4'>{product.description}</div>
													<hr />
													<div className='my-4 text-white px-4'>Unique buy: {product.unique_buy ? 'Yes' : 'No'}</div>
													<div className='my-4 text-white px-4'>Mark as sold: {product.sold ? 'Yes' : 'No'}</div>
													<div className='flex justify-between w-full'>
														<button
															className='bg-green-600 px-3 p-2 uppercase w-full text-white'
															onClick={() => handleInitializeEdit(product)}
														>
															EDIT
														</button>
														<button
															className='bg-yellow-600 px-3 p-2 uppercase w-full text-white'
															onClick={() => handleHideProduct(product)}
														>
															Mark as sold
														</button>
													</div>
													<div className='flex w-full'>
														<button
															className='bg-blue-600 w-full py-2 px-4 uppercase text-white'
															onClick={() => handleGetUsers(product)}
														>
															Download Users That Bought
														</button>
													</div>
													<div className='flex w-full'>
														<button
															className='bg-red-600 w-full py-2 px-4 uppercase text-white'
															onClick={() => handleDeleteProduct(product)}
														>
															Delete product
														</button>
													</div>
												</div>
											))}
										</div>
									</div>
								</>
							)}
						</div>
					)}
				</div>
			)}
			{!metamaskAddress && !allowed && (
				<div className='min-h-screen text-center'>
					<h1 className='mt-24 uppercase text-2xl text-purple-600 font-semibold'>Connect to metamask</h1>
				</div>
			)}
		</div>
	);
}
