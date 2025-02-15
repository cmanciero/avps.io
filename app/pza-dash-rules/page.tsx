import Image from 'next/image';
import Link from 'next/link';

type Props = {};

function page({}: Props) {
	return (
		<div>
			<section className='bg-gray-100 pb-8 pt-28 minHeight'>
				<div
					className='container mx-auto px-8 flex flex-col gap-3'
					style={{ maxWidth: '1500px' }}
				>
					<h1 className='text-xl'>
						<b>PZA Dash Competition Rules</b>
					</h1>
					<h2 className='text-lg'>How to Participate</h2>
					<ol>
						<li>
							<b>
								Download the Latest Version of{' '}
								<Link
									className='underline'
									href='./pza-dash'
								>
									PZA Dash
								</Link>
							</b>
							: Ensure you have the most up-to-date version of the game to participate.
						</li>
						<li>
							<b>Enter Your Email Address:</b> You must enter a valid email address to be used for sending the gift card if you win.
						</li>
					</ol>
					<h2 className='text-lg'>Prizes</h2>
					<ul>
						<li>
							<b>1st Place:</b> $50 Amazon Gift Card.
						</li>
						<li>
							<b>2nd Place:</b> $25 Amazon Gift Card.
						</li>
						<li>
							<b>3rd Place:</b> $10 Amazon Gift Card.
						</li>
						<li>
							<b>Bonus for AVP NFT Holders:</b> If you place in the top 3 and are an AVP NFT holder, you will receive a 10% bonus on your
							gift card prize. AVP NFTs can be purchased on{' '}
							<Link
								className='underline'
								href='https://opensea.io/collection/averagepunks-'
								target='_blank'
							>
								OpenSea
							</Link>
						</li>
					</ul>
					<h2 className='text-lg'>Competition Timeline</h2>
					<ul>
						<li>
							The competition will run for <b>25 Days</b> (Dec 1st - Dec 25th 8pm EST).
						</li>
					</ul>
					<h2 className='text-lg'>Leaderboard & Final Standings</h2>
					<ul>
						<li>
							Final leaderboard standings will be determined based on the PlayFab leaderboard at the end of the competition. These standings
							will be used to allocate prizes.
						</li>
					</ul>
					<h2 className='text-lg'>Cheating Policy</h2>
					<ul>
						<li>We reserve the right to nullify any participant's results if cheating or unfair practices are suspected.</li>
					</ul>
					Join the fun and download PZA Dash today!
					<div className='flex flex-row flex-wrap gap-2'>
						<Link href='https://apps.apple.com/us/app/pza-dash/id6578420355'>
							<img
								src='../assets/images/AppStoreDwnld.svg'
								alt='Download PZA Dash from the App Store'
								className='w-30 h-10'
							/>
						</Link>
						<Link href='https://play.google.com/store/apps/details?id=com.PrettyAverageLLC.PZADash'>
							<Image
								src='../assets/images/GooglePlay.png'
								alt='Download PZA Dash from Google Play'
								className='w-30 h-10'
							/>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}

export default page;
