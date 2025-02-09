import Image from 'next/image';
import Link from 'next/link';

import AVP1_GIF from '../../assets/images/AVP1.gif';
import AVP1 from '../../assets/images/AVP1.png';

type Props = {};

function Moon({}: Props) {
	return (
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
					AVP is a community of diverse people doing what they do best - being #PrettyAverage. And that includes some pretty average
					<Link
						href='#utility'
						className='cursor-pointer text-purple-600 hover:text-white font-semibold mx-1'
					>
						utility
					</Link>
					as well, like eating $PZA while getting alpha!
				</div>
			</div>
		</section>
	);
}

export default Moon;
