import "@/styles/globals.css";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { SpicyChain } from "@thirdweb-dev/chains";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Menubar from "@/components/Menubar";
import Footer from "@/components/Footer";


const metadata = {
	name: "Next Starter Template",
	description: "A Next.js starter template with Web3Modal v3 + Wagmi",
	url: "https://web3modal.com",
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export default function App({ Component, pageProps }: AppProps) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setReady(true);
	}, []);
	return (
		<>
		{ready ? (
			<ThirdwebProvider
        	    activeChain={SpicyChain}
        	    clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        	    supportedWallets={[metamaskWallet()]}
        	>
          	<Menubar>
					<Component {...pageProps} />
          	</Menubar>
			<Footer />
		  </ThirdwebProvider>
			) : null}
		</>
	);
}
