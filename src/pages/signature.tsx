import React from "react"
import { useAddress, useMintNFT, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { MintMetadata } from "@/types/mintMetadata";
import Image from "next/image";
import SignatureCard from "@/components/SignNFT";

export default function Signature() {
    const address = useAddress();

    const signature = "0xcFe2f2513940c08b85E028CE234Bd86F223B3566"

    console.log(address)
    
    const { contract: signContract, isLoading: nftLoading } =
    useContract(signature);
    
    const {data:ownedNFTs, isLoading:isOwner} = useOwnedNFTs(signContract, address)
  
    const {
      mutate: mintNft,
      isLoading,
      error,
    } = useMintNFT(signContract);
  
    const handleMint = async (event: React.FormEvent) => {
      event.preventDefault();
  
      const name = "CR7 Signature";
      const description = "To make your formas more valuable, send his signature to their wallets.";
      const image = "https://p1.hiclipart.com/preview/754/680/834/cristiano-ronaldo-signature-png-clipart.jpg";
  
      const metadata: MintMetadata = {
        metadata: {
          image,
          name,
          description,
        },
        to: address ?? "",
        supply: 1,
      };
  
      try {
          mintNft(metadata);
      } catch (e) {
        console.error("Minting failed", e);
      }
    };
    return(
        <div className="flex flex-col w-screen justify-center items-center">
            <div className="flex flex-col w-screen h-screen justify-center items-center gap-y-10">
            <h1>This page will be specifically for Ronaldo&apos;s minting when he has a wallet. Since he is not in Bootcamp, you are free to make it for him.</h1>
            <h1>To sign the forma, you should convert your wallet to NFT from Homepage and copy its wallet address. Then transfer the Signature NFT to Forma.</h1>
              <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-md max-w-2xl text-center">
                <div className="m-5">
                  <Image 
                    src="/logo.png"
                    alt="Cr7 signature"
                    height="100"
                    width="350"
                  />
                </div>
                <button
                  className="mt-6 bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                  onClick={handleMint}
                  disabled={isLoading}
                >
                  {isLoading ? 'Minting...' : 'Mint Cr7 Signature'}
                </button>
              </div>
            </div>
            <div>
            {isLoading ? <div>Loading NFT Data...</div> : <div className='flex flex-col gap-y-10'>
                    {ownedNFTs && ownedNFTs.map((nft:any,id:any) => (
                        <SignatureCard key={id} {...nft} />
                    ))}
                    </div>}
            </div>
        </div>
    )
}