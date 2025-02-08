'use client';

import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

import Alpha from '../../assets/images/alpha_pfp.png';
import AVP5_GIF from '../../assets/images/AVP5.gif';
import AVP5 from '../../assets/images/AVP5.png';
import Furp from '../../assets/images/furp_pfp.png';
import Maskwa from '../../assets/images/maskwa_pfp.png';
import Mngo from '../../assets/images/mngo_pfp.png';
import Super from '../../assets/images/supermanciero_pfp.png';
import LinkedIn from '../linkedIn/LinkedIn';
import Twitter from '../twitter/Twitter';

export interface IPartner {
	id: string;
	profile: StaticImageData;
	name: string;
	summary: string;
	twitter?: string;
	linkedIn?: string;
}

type Props = {};

function Bar({}: Props) {
	const partners: IPartner[] = [
		{
			id: 'maskwa',
			profile: Maskwa,
			name: 'Brad Provencher',
			summary: 'Ran companies, built non-profits, and know how to streamline for success.',
			twitter: 'https://twitter.com/incendiarylyfe',
			linkedIn: 'https://www.linkedin.com/in/bradprovencher/',
		},
		{
			id: 'furp',
			profile: Furp,
			name: 'Frank Uriostegui',
			summary: 'Striving to create a strong foundation for a solid future to take care of those closest to him.',
			twitter: 'https://twitter.com/furpmr',
			linkedIn: '',
		},
		{
			id: 'alpha',
			profile: Alpha,
			name: 'Paul Bhogal',
			summary: 'Firm believer in breaking barriers and taking chances.',
			twitter: 'https://twitter.com/alphageek79',
			linkedIn: 'https://www.linkedin.com/in/paul-bhogal-3490264/',
		},
		{
			id: 'mngo',
			profile: Mngo,
			name: 'Jon Van Wyk',
			summary: 'Experience with managing people, leading programs, and creating strategic plans.',
			twitter: 'https://twitter.com/jonvwyk',
			linkedIn: '',
		},
		{
			id: 'super',
			profile: Super,
			name: 'Chris Manciero',
			summary: 'Works hard to get the job done, but also has fun doing it.',
			twitter: 'https://twitter.com/chrismanciero',
			linkedIn: 'https://www.linkedin.com/in/chris-manciero-095a653/',
		},
	];

	const blankPartner: IPartner = {
		id: 'blank',
		profile: Super,
		name: '',
		summary: '',
	};

	const [selectedPartner, setSelectedPartner] = useState<IPartner>();
	const [selectedPartnerId, setSelectedPartnerId] = useState<string>();
	const [isMobile, setIsMobile] = useState(false);

	const partnerClick = (member: IPartner) => {
		setSelectedPartnerId(member.id);
		setSelectedPartner(member);
	};

	return (
		<section
			className='bar'
			id='team'
		>
			<Image
				src={AVP5}
				alt='Bar'
				className='bgImage'
			/>
			<Image
				src={AVP5_GIF}
				alt='Bar'
				className='bgImage'
			/>
			<div className='partners'>
				{partners.map((partner) => (
					<div
						key={partner.id}
						onClick={() => partnerClick(partner)}
						onMouseOver={() => partnerClick(partner)}
						onMouseOut={() => partnerClick(blankPartner)}
					>
						<div className={'partner ' + (selectedPartnerId === partner.id ? 'show' : '')}>
							<div className='flex flex-col pfp gap-2'>
								<label className='text-purple-700'>{partner.name}</label>
								<Image
									src={partner.profile}
									alt='Member PFP'
								/>
								{partner.summary}
								<div className='socials justify-evenly items-center flex flex-row justify-self-end'>
									{partner.twitter && <Twitter link={partner.twitter} />}
									{partner.linkedIn && <LinkedIn link={partner.linkedIn} />}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default Bar;
