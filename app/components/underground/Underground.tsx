'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import AVP4 from '../../assets/images/AVP4.png';
import AVP_1700 from '../../assets/images/avps/1700.png';
import AVP_1817 from '../../assets/images/avps/1817.png';
import AVP_2537 from '../../assets/images/avps/2537.png';
import AVP_2638 from '../../assets/images/avps/2638.png';
import AVP_2728 from '../../assets/images/avps/2728.png';
import AVP_3396 from '../../assets/images/avps/3396.png';
import AVP_680 from '../../assets/images/avps/680.png';
import AVP_Mascot from '../../assets/images/avps/mascot-604.png';
import AVP_Maskwa from '../../assets/images/avps/maskwa-3507.png';

type Props = {};

function Underground({}: Props) {
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
		<section className='underground'>
			<Image
				src={AVP4}
				alt='basement'
				className='bgImage'
			/>
			<div className='content'>
				<div className={'avps flex flex-row flex-wrap ' + (isMobile ? 'mobile' : '')}>
					<Image
						src={AVP_2728}
						alt='AVP #2728'
					/>
					<Image
						src={AVP_680}
						alt='AVP #680'
					/>
					<Image
						src={AVP_1700}
						alt='AVP #1700'
					/>
					<Image
						src={AVP_2537}
						alt='AVP #2537'
					/>
					<Image
						src={AVP_Mascot}
						alt='AVP Mascot'
					/>
					<Image
						src={AVP_1817}
						alt='AVP #1817'
					/>
					<Image
						src={AVP_Maskwa}
						alt='AVP #3507'
					/>
					<Image
						src={AVP_2638}
						alt='AVP #2638'
					/>
					<Image
						src={AVP_3396}
						alt='AVP #3396'
					/>
				</div>
				<p>
					<b>Average Punks (AVPs)</b> are 4200 randomly generated 3D Characters punking around the Ethereum blockchain as ERC-721 tokens and
					hosted on IPFS. Full characters will be able to be uploaded to DCL soon. See you all on the Metaverse!
					<Link
						href='https://opensea.io/collection/averagepunks-'
						className='cursor-pointer text-purple-600 hover:text-white font-semibold ml-1'
					>
						Get your Average Punk here
					</Link>
					<br />
					<br />
					<b>MetaVerse Punks (MVPs)</b> are unique 1 of 1 characters designed to roam the Metaverse with their distinctive traits. MVPs are
					the Genesis On-Chain collection within the Average Punk Universe.
					<Link
						href='https://opensea.io/collection/metaverse-punks-'
						className='cursor-pointer text-purple-600 hover:text-white font-semibold ml-1'
					>
						Get your Metaverse Punk here
					</Link>
				</p>
			</div>
		</section>
	);
}

export default Underground;
