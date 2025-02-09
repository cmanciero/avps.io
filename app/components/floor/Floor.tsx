import Image from 'next/image';
import Link from 'next/link';

import AVP3_GIF from '../../assets/images/AVP3.gif';
import AVP3 from '../../assets/images/AVP3.png';

type Props = {};

function Floor({}: Props) {
	return (
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
	);
}

export default Floor;
