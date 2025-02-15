import Image from 'next/image';
import Link from 'next/link';

import AppleStore from '../assets/images/AppStoreDwnld.svg';
import GooglePlay from '../assets/images/GooglePlay.png';
import Obstacles from '../assets/images/pza-dash/image2.png';
import CollectPza from '../assets/images/pza-dash/image3.png';
import GrabPowerUps from '../assets/images/pza-dash/image4.png';
import CompleteMissions from '../assets/images/pza-dash/image5.png';
import GrabBoxes from '../assets/images/pza-dash/image6.png';

type Props = {};

function page({}: Props) {
	return (
		<div>
			<section className='bg-gray-100 pb-8 pt-28'>
				<div
					className='container mx-auto px-8 flex flex-col gap-3'
					style={{ maxWidth: '1500px' }}
				>
					<h1>
						<b>Unleash Your Inner Average Hero in PZA Dash!</b>
					</h1>
					<p>Welcome to PZA Dash—the most thrilling and addictive endless runner game you'll ever play!</p>
					<div className='flex flex-row justify-center flex-wrap gap-2'>
						<Image
							src={Obstacles}
							alt='Avoid obstacles'
							className='w-38 sm:w-auto sm:h-102'
						/>
						<Image
							src={CollectPza}
							alt='Collect $PZA'
							className='w-38 sm:w-auto sm:h-102'
						/>
						<Image
							src={GrabBoxes}
							alt='Grab $PZA Boxes'
							className='w-38 sm:w-auto sm:h-102'
						/>
						<Image
							src={GrabPowerUps}
							alt='Grab power-ups'
							className='w-38 sm:w-auto sm:h-102'
						/>
						<Image
							src={CompleteMissions}
							alt='Complete missions'
							className='w-38 sm:w-auto sm:h-102'
						/>
					</div>
					<p>Meet our hero, a Pretty Average dude, on a quest to collect as much $PZA Coin as possible.</p>
					<b> Features: </b>
					<ul>
						<li>$PZA Coin: Collect these shiny tokens scattered across the city. Every coin gets you closer to glory!</li>
						<li>Average $PZA Boxes: Grab these surprise boxes to discover bonus coins.</li>
						<li>Pickle Magnet: Activate this special power-up to attract $PZA Coins from afar, making your run even more rewarding!</li>
					</ul>
					<b>Why You'll Love PZA Dash:</b>
					<ul>
						<li>Engaging Gameplay: Navigate through vibrant cityscapes, dodge obstacles, and outrun the challenges that come your way.</li>
						<li>Unique Power-Ups: Use the Pickle Magnet to maximize your coin collection and boost your score.</li>
						<li>Fun and Addictive: Perfect for a quick game on the go or an extended play session to beat your high score.</li>
					</ul>
					Join the fun and download PZA Dash today!
					<div className='flex flex-row flex-wrap gap-2'>
						<Link href='https://apps.apple.com/us/app/pza-dash/id6578420355'>
							<Image
								src={AppleStore}
								alt='Download PZA Dash from the App Store'
								className='w-30 h-10'
							/>
						</Link>
						<Link href='https://play.google.com/store/apps/details?id=com.PrettyAverageLLC.PZADash'>
							<Image
								src={GooglePlay}
								alt='Download PZA Dash from Google Play'
								className='w-30 h-10'
							/>
						</Link>
					</div>
					<p>
						Can you become the ultimate Average Hero and dominate the leaderboards? There's only one way to find out—dash into action now!
					</p>
					<div className='flex justify-center'>
						<iframe
							width='50%'
							height='315'
							src='https://www.youtube.com/embed/sWBq0_0m4QI?si=txO3PKiAL5qaukj0'
							title='YouTube video player'
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							referrerPolicy='strict-origin-when-cross-origin'
							allowFullScreen
						></iframe>
					</div>
				</div>
			</section>
		</div>
	);
}

export default page;
