'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import AVP2 from '../../assets/images/AVP2.png';

type Props = {};

function Roof({}: Props) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const onResize = () => {
			setIsMobile(window.innerHeight <= 500 || window.innerWidth <= 1000);
		};

		window.addEventListener('resize', onResize);

		onResize();

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return (
		<section
			className='roof'
			id='utility'
		>
			<Image
				src={AVP2}
				alt='Hotel'
				className='bgImage'
			/>
			<div className='content'>
				{isMobile && (
					<div className='mt-2 contentWrapper'>
						<ul className='mt-2'>
							<label className='text-xl font-semibold'>AVP Utilities</label>
							<li>
								<b>Earn $PZA</b>
							</li>
							<li>
								<b>$PZA Market</b>
							</li>
							<li>
								<b>Quality Alpha</b>
							</li>
							<li>
								<b>Learning & Development</b>
							</li>
							<li>
								<b>Training courses</b>
							</li>
							<li>
								<b>Web3 Job Placement</b>
							</li>
							<li>
								AVP holder-only <b>giveaways</b>
							</li>
							<li>
								<b>Project Incubator</b>
							</li>
						</ul>
						<ul className='mt-2'>
							<label className='text-xl font-semibold'>MVP Utilities</label>
							<li>
								All AVP Utilities <b>plus:</b>
							</li>
							<li>
								<b>Earn additional $PZA</b>
							</li>
							<li>
								MVP holder-only <b>giveaways</b>
							</li>
						</ul>
					</div>
				)}
				{!isMobile && (
					<div className='mt-2 contentWrapper'>
						<ul className='mt-2 mb-4'>
							<label className='text-xl font-semibold'>AVP Utilities</label>
							<li>
								<b>Earn $PZA</b> just from holding AVP and MVPs - no staking needed!!
							</li>
							<li>
								<b>$PZA Market</b> Spend your $PZA on WL spots, NFT's, IRL Merch, Surprise PZA Boxes, and more
							</li>
							<li>
								<b>Quality Alpha</b> and analysis by trained NFT analysts and NFT Whales holding several bluechips
							</li>
							<li>
								<b>Learning & Development</b> of the NFT Space with Whales and NFT Specialists
							</li>
							<li>
								<b>Training courses</b> Discord Community Management, Head Mod, Mod, and Discord security
							</li>
							<li>
								<b>Web3 Job Placement</b> We help find Web3 jobs for our graduates and holders
							</li>
							<li>
								AVP holder-only <b>giveaways</b>
							</li>
							<li>
								<b>Project Incubator</b> to provide services for artists who want to launch their own brand
							</li>
						</ul>
						<ul className='mt-2'>
							<label className='text-xl font-semibold'>MVP Utilities</label>
							<li>
								All AVP Utilities <b>plus:</b>
							</li>
							<li>
								<b>Earn additional $PZA</b> from holding an MVP
							</li>
							<li>
								MVP holder-only <b>giveaways</b>
							</li>
						</ul>
					</div>
				)}
			</div>
		</section>
	);
}

export default Roof;
