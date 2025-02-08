import Image from 'next/image';
import Link from 'next/link';

import AVP1_GIF from './assets/images/AVP1.gif';
import AVP1 from './assets/images/AVP1.png';
import AVP2 from './assets/images/AVP2.png';
import AVP3_GIF from './assets/images/AVP3.gif';
import AVP3 from './assets/images/AVP3.png';
import AVP4 from './assets/images/AVP4.png';
import AVP_1700 from './assets/images/avps/1700.png';
import AVP_1817 from './assets/images/avps/1817.png';
import AVP_2537 from './assets/images/avps/2537.png';
import AVP_2638 from './assets/images/avps/2638.png';
import AVP_2728 from './assets/images/avps/2728.png';
import AVP_3396 from './assets/images/avps/3396.png';
import AVP_680 from './assets/images/avps/680.png';
import AVP_Mascot from './assets/images/avps/mascot-604.png';
import AVP_Maskwa from './assets/images/avps/maskwa-3507.png';
import Bar from './components/bar/Bar';

export default function Home() {
	return (
		<main>
			<div className='background'></div>
			<section className='moon'>
				<Image
					src={AVP1}
					alt='AVP - Roof'
					className='bgImage'
				/>
				<Image
					alt='AVP - Roof'
					src={AVP1_GIF}
					className='bgImage'
				/>
				<div className='subgrid'>
					<div className='moonshot'>
						AVP is a community of diverse people doing what they do best - being #PrettyAverage. And that includes some pretty average{' '}
						<Link
							href='#utility'
							className='cursor-pointer text-purple-600 hover:text-white font-semibold'
						>
							utility
						</Link>
						as well, like eating $PZA while getting alpha!
					</div>
				</div>
			</section>
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
					{/* <p className='flex justify-evenly'> */}
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
					{/* </p> */}
					{/* <p className='mt-2'> */}
					<label className='text-xl font-semibold'>AVP Utilities</label>
					<ul className='mt-2 mb-4'>
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
					<label className='text-xl font-semibold'>MVP Utilities</label>
					<ul className='mt-2'>
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
					{/* </p> */}
				</div>
				<section className='floor'>
					<Image
						src={AVP3}
						alt='floor'
						className='bgImage'
					/>
					<Image
						src={AVP3_GIF}
						alt='floor'
						className='bgImage'
					/>
					<Link
						href='/pza-market'
						className='cursor-pointer enter'
					></Link>
				</section>
			</section>
			<section className='underground'>
				<Image
					src={AVP4}
					alt='basement'
					className='bgImage'
				/>
				<div className='content'>
					/* :className="[isMobile ? 'mobile' : '']" */
					<div className='avps flex flex-row flex-wrap'>
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
						<b>Average Punks (AVPs)</b> are 4200 randomly generated 3D Characters punking around the Ethereum blockchain as ERC-721 tokens
						and hosted on IPFS. Full characters will be able to be uploaded to DCL soon. See you all on the Metaverse!
						<Link
							href='https://opensea.io/collection/averagepunks-'
							className='cursor-pointer text-purple-600 hover:text-white font-semibold'
						>
							Get your Average Punk here
						</Link>
						<br />
						<br />
						<b>MetaVerse Punks (MVPs)</b> are unique 1 of 1 characters designed to roam the Metaverse with their distinctive traits. MVPs
						are the Genesis On-Chain collection within the Average Punk Universe.
						<Link
							href='https://opensea.io/collection/metaverse-punks-'
							className='cursor-pointer text-purple-600 hover:text-white font-semibold'
						>
							Get your Metaverse Punk here
						</Link>
					</p>
				</div>
			</section>
			<Bar />
		</main>
	);
}
