import { ConnectButton } from "web3uikit"
import Link from "next/link"
import ProceedsModal from "./ProceedsModal"
import SellModal from "./SellModal"
import { useState, useEffect } from "react"

export default function Header({
    setShowSellModal,
    setShowProceedsModal,
    showSellModal,
    showProceedsModal,
}) {
    // const [showProceedsModal, setShowProceedsModal] = useState(false)
    const hideProceedsModal = () => {
        setShowProceedsModal(false)
    }
    // const [showSellModal, setShowSellModal] = useState(false)
    const hideSellModal = () => {
        setShowSellModal(false)
    }

    function handleClick() {
        setShowProceedsModal(true)
    }

    function handleClick2() {
        setShowSellModal(true)
    }

    // useEffect(() => {
    //     setShowProceedsModal(false)
    //     setShowSellModal(false)
    // }, [])

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
                    {/* <ProceedsModal onClose={hideProceedsModal} isVisible={showProceedsModal} /> */}
                </div>

                <div>
                    <SellModal onClose={hideSellModal} isVisible={showSellModal} />
                    {/* <SellModal onClose={hideSellModal} isVisible={showSellModal} /> */}
                </div>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
