import Bar from './components/bar/Bar';
import Floor from './components/floor/Floor';
import Moon from './components/moon/Moon';
import Roof from './components/roof/Roof';
import Underground from './components/underground/Underground';

export default function Home() {
	return (
		<main>
			<div className='background'></div>
			<Moon />
			<Roof />
			<Floor />
			<Underground />
			<Bar />
		</main>
	);
}
