import { useState } from 'react';

import { IProduct } from '@/app/oven/page';

import Discord from '../discord/Discord';
import Instagram from '../instagram/Instagram';
import Twitter from '../twitter/Twitter';
import Website from '../website/Website';

type Props = {
	canRate: () => boolean;
	canBuy: boolean;
	hideButton?: boolean;
	product: IProduct;
	buy?: (product: IProduct) => void;
};

function Product({ product, canBuy, buy }: Props) {
	const [hideButton, setHideButton] = useState(false);
	return (
		<div className={'rounded-lg shadow hover:shadow-lg bg-white ' + (product.sold ? 'opacity-50' : '')}>
			<div className='relative'>
				<img
					src={product.img}
					className='rounded-t-lg h-auto min-h-72 max-h-72 w-full object-cover'
					style={{ minHeight: '288px', maxHeight: '288px' }}
				/>
			</div>
			<div className='p-4'>
				<div className='flex flex-row items-center'>
					<div className='flex-1 text-left'>
						<div className='flex flex-col'>
							<p className='text-purple-600 no-underline text-md font-bold'>{product.name}</p>
							<p className='text-xs text-purple-300 font-bold'>
								{product.quantity} left
								{product.total_supply && <span>out of {product.total_supply}</span>}
							</p>
						</div>
					</div>
					<div className='text-right'>
						<p className='flex flex-col -mt-3'>
							<span className='font-bold text-purple-600 text-sm'>{product.price} $PZA</span>
						</p>
					</div>
				</div>
				<div className='text-sm text-purple-600 mb-2 max-h-12 min-h-12 overflow-y-scroll mt-8'>{product.description}</div>
				<div
					className='flex flex-row text-purple-600 uppercase text-xs my-4 w-full justify-between items-center'
					style={{ maxWidth: '190px' }}
				>
					<Twitter link={product.links && product.links.twitter ? product.links.twitter : '#'} />
					<Discord link={product.links && product.links.discord ? product.links.discord : '#'} />
					<Website link={product.links && product.links.website ? product.links.website : '#'} />
					<Instagram link={product.links && product.links.instagram ? product.links.instagram : '#'} />
				</div>

				{!hideButton && (
					<button
						disabled={!canBuy}
						onClick={() => buy(product)}
						className={
							'inline-block rounded-lg font-bold uppercase transition-colors duration-300 ease-in-out levitate mt-4 w-full items-center bg-white text-center text-purple-600 border border-purple-300 ' +
							(canBuy && !product.sold ? 'hover:bg-purple-600 hover:text-white cursor-pointer' : 'cursor-default')
						}
					>
						<span className='inline-block py-3 ml-4 mr-4'>ADD TO CART</span>
					</button>
				)}
			</div>
		</div>
	);
}

export default Product;
