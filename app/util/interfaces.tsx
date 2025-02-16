import { StaticImageData } from 'next/image';

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

export interface IPartner {
	id: string;
	profile: StaticImageData;
	name: string;
	summary: string;
	twitter?: string;
	linkedIn?: string;
}
