'use client';

import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Web3 from 'web3';

import { useAvpContext } from '@/app/context/AVPContextProvider';
import { SHOP_URL, ToastTypes } from '@/app/pza-market/page';

type Props = {
	gifted: () => void;
};

function TransferModal({ gifted }: Props) {
	const [giveTo, setGiveTo] = useState('');
	const [amountToGive, setAmountToGive] = useState(1);
	const { walletAddress, provider } = useAvpContext();

	const handleGiveToChange = (event: ChangeEvent<HTMLInputElement>) => {
		setGiveTo(event.target.value);
	};

	const handleAmountToGive = (event: ChangeEvent<HTMLInputElement>) => {
		setAmountToGive(parseInt(event.target.value));
	};

	const showToast = (message: string, type: ToastTypes) => {
		if (type === ToastTypes.SUCCESS) {
			toast.success(message, {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
				transition: Bounce,
			});
		} else if (type === ToastTypes.ERROR) {
			toast.error(message, {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
				transition: Bounce,
			});
		}
	};

	const gift = async () => {
		if (!giveTo || amountToGive <= 0) {
			return showToast('Missing Input', ToastTypes.ERROR);
		}

		const web3 = new Web3(provider);
		let receiver = giveTo;
		if (receiver.includes('.eth')) {
			// receiver = await web3.eth.ens.getAddress(receiver);
			return showToast('Please provide the hexadecimal address', ToastTypes.ERROR);
		}
		try {
			const msg = 'You are giving ' + amountToGive + ' $PZA to ' + receiver;

			// console.log({ msg: this.msg });
			const sig = await web3.eth.personal.sign(msg, walletAddress);
			await axios.post(`${SHOP_URL}/transferPizzas`, {
				receiver: receiver,
				amount: amountToGive,
				wallet: walletAddress,
				message: msg,
				signature: sig,
			});
			// console.log("ret ", ret);

			showToast(amountToGive + ' $PZA sent', ToastTypes.SUCCESS);

			setGiveTo('');
			setAmountToGive(1);

			gifted();
		} catch (error) {
			showToast(error, ToastTypes.ERROR);
		}
	};
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};
	return (
		<div className='absolute top-1/2 left-1/2 w-[400px] rounded-md bg-white p-4 translate-x-[-50%] translate-y-[-50%]'>
			<p className='text-sm text-purple-600'>
				Address to gift
				<br />
				<span className='text-purple-400'>no ens domain - must be an AVP or MVP holder</span>
			</p>
			<input
				value={giveTo}
				onChange={handleGiveToChange}
				type='text'
				className='border my-2 p-2 rounded text-black w-full'
			/>
			<p className='text-purple-600 text-sm'>Amount to transfer</p>
			<input
				value={amountToGive}
				onChange={handleAmountToGive}
				type='number'
				className='outline-none border w-full my-2 p-2 rounded text-black max-w-xs'
				min='1'
			/>
			<br />
			<button
				onClick={gift}
				className='mt-2 hover:bg-purple-600 hover:text-white border bg-white px-4 border-purple-300 py-2 text-purple-600 uppercase font-semibold rounded cursor-pointer focus:outline-none'
			>
				Transfer
			</button>
			<ToastContainer />
		</div>
	);
}

export default TransferModal;
