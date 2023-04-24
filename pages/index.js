import { useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"
import networkMapping from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"
import { useState } from "react"
import ConnectModal from "../components/ConnectModal"
import Header from "../components/Header"
import ProceedsModal from "../components/ProceedsModal"
import SellModal from "../components/SellModal"

export default function Home() {
    const { chainId, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : null
    const marketplaceAddress =
        chainId && networkMapping[chainString]
            ? networkMapping[chainString].NftMarketplace[0]
            : null

    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)

    const [isModal, setIsModal] = useState(false)

    const [showProceedsModal, setShowProceedsModal] = useState(false)
    const [showSellModal, setShowSellModal] = useState(false)
    const hideProceedsModal = () => {
        setShowProceedsModal(false)
    }
    const hideSellModal = () => {
        setShowSellModal(false)
    }

    return (
        <div>
            <Header
                setShowProceedsModal={setShowProceedsModal}
                setShowSellModal={setShowSellModal}
            />
            <div className={showSellModal ? null : "hidden"}>
                <SellModal onClose={hideSellModal} isVisible={showSellModal} />
            </div>
            <div className={showProceedsModal ? null : "hidden"}>
                <ProceedsModal onClose={hideProceedsModal} isVisible={showProceedsModal} />
            </div>
            {isWeb3Enabled ? (
                marketplaceAddress ? (
                    <div className="mx-10">
                        <div className="flex font-bold text-3xl justify-center mt-10 mb-28 font-sourceCodePro">
                            Recently Listed
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {isWeb3Enabled ? (
                                loading || !listedNfts ? (
                                    <div>Loading...</div>
                                ) : (
                                    listedNfts.mostRecent.map((nft, index) => {
                                        console.log(nft)
                                        const { price, nftAddress, tokenId, seller } = nft
                                        return (
                                            <div
                                                className={`p-5 mb-10 ${
                                                    index % 2 === 1
                                                        ? "min-[1507px]:mt-40"
                                                        : "min-[1507px]:-mt-10"
                                                } ${isModal ? null : "hover:scale-110"}`}
                                            >
                                                <div className="relative">
                                                    <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-300 to-indigo-300 rounded-[20px] blur"></div>
                                                    <div className="border-[#888] border-2 rounded-[20px]">
                                                        <NFTBox
                                                            price={price}
                                                            nftAddress={nftAddress}
                                                            tokenId={tokenId}
                                                            marketplaceAddress={marketplaceAddress}
                                                            seller={seller}
                                                            key={`${nftAddress}${tokenId}`}
                                                            setIsModal={setIsModal}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            ) : (
                                <div className={isWeb3Enabled ? "hidden" : null}>
                                    <ConnectModal />
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center flex justify-center font-sourceCodePro font-bold text-black text-xl m-20 md:mt-48">
                        Network not currently supported... please switch to Goerli Testnet.
                    </div>
                )
            ) : (
                <div className={isWeb3Enabled ? "hidden" : null}>
                    <ConnectModal />
                </div>
            )}
        </div>
    )
}
