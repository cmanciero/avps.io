type Props = {
	type: string;
};

function DepositModal({ type }: Props) {
	const handleClick = () => {
		if (type === 'deposit') {
			deposit();
		} else {
			withdraw();
		}
	};
	return (
		<div className='absolute top-1/2 left-1/2 w-[400px] rounded-md bg-white p-4 translate-x-[-50%] translate-y-[-50%]'>
			<p className='text-purple-600 mb-2'>
				{type === 'deposit'
					? 'Make a deposit from your onchain balance into the marketplace'
					: 'Withdraw from the marketplace balance to onchain $PZA'}
			</p>
			<input
				type='number'
				v-model='amount'
				className='border w-full p-2 max-w-xs outline-none'
			/>
			<div className='flex items-center w-full mt-4'>
				<button
					onClick={handleClick}
					className='hover:bg-purple-600 hover:text-white border bg-white px-4 border-purple-300 py-2 text-purple-600 uppercase font-semibold rounded cursor-pointer focus:outline-none'
				>
					{type === 'deposit' ? 'Deposit' : 'Withdraw'}
				</button>
			</div>
		</div>
	);
}

export default DepositModal;
