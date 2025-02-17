import type { Metadata } from 'next';
import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Poppins } from 'next/font/google';

import { config } from '@fortawesome/fontawesome-svg-core';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { AVPContextProvider } from './context/AVPContextProvider';

config.autoAddCss = false;

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-poppins',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'AVPs',
	description: 'Pretty Average Community',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${poppins.variable} antialiased`}>
				<AVPContextProvider>
					<Header />
					{children}
					<Footer />
				</AVPContextProvider>
			</body>
		</html>
	);
}
