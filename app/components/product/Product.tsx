export interface IProduct {
	id: string;
	price: number;
	name: string;
	img: string;
}

type Props = {
	canRate: () => boolean;
	canBuy: boolean;
	hideButton?: boolean;
	product: IProduct;
	buy?: (product: IProduct) => void;
};

function Product({}: Props) {
	return <div>Product</div>;
}

export default Product;
