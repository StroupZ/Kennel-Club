import { ConnectButton } from "web3uikit"
import Link from "next/link"
import ProceedsModal from "./ProceedsModal"
import SellModal from "./SellModal"
import { useState } from "react"
import { useMoralis } from "react-moralis"
import networkMapping from "../constants/networkMapping.json"

export default function Header() {
    const [showProceedsModal, setShowProceedsModal] = useState(false)
    const hideProceedsModal = () => {
        setShowProceedsModal(false)
    }
    const [showSellModal, setShowSellModal] = useState(false)
    const hideSellModal = () => {
        setShowSellModal(false)
    }

    const { isWeb3Enabled, chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : null
    const marketplaceAddress =
        chainId && networkMapping[chainString]
            ? networkMapping[chainString].NftMarketplace[0]
            : null

    function handleClick() {
        isWeb3Enabled && marketplaceAddress ? setShowProceedsModal(true) : null
    }

    function handleClick2() {
        isWeb3Enabled && marketplaceAddress ? setShowSellModal(true) : null
    }

    return (
        <nav className="p-2 border-b-2 border-neutral-300 flex flex-col md:flex-row justify-between items-center">
            <h1 className="flex flex-row py-2 px-4 items-center text-5xl text-gray-600 font-audiowide">
                <a href="/">
                    <img
                        className="min-w-[100px] min-h-[100px] hover:scale-125"
                        src="./kennel-club.svg"
                    />
                </a>
                Kennel Club NFTs
            </h1>
            <div className="flex flex-col md:flex-row items-center font-sourceCodePro">
                <Link href="/" className="mr-2 p-4 hover:scale-125 hover:text-blue-600">
                    Home
                </Link>
                <Link href="/browseNfts" className="mr-2 p-4 hover:scale-125 hover:text-blue-600">
                    Browse NFTs
                </Link>
                <div
                    className="cursor-pointer mr-2 p-4 hover:scale-125 hover:text-blue-600"
                    onClick={handleClick2}
                >
                    Sell NFTs
                </div>
                <div
                    className="cursor-pointer mr-2 p-4 hover:scale-125 hover:text-blue-600"
                    onClick={handleClick}
                >
                    Proceeds
                </div>
                <div>
                    <ProceedsModal onClose={hideProceedsModal} isVisible={showProceedsModal} />
                </div>

                <div>
                    <SellModal onClose={hideSellModal} isVisible={showSellModal} />
                </div>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
