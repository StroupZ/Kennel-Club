import { useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"
import networkMapping from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"
import { Dropdown } from "web3uikit"
import { useState } from "react"
import ConnectModal from "../components/ConnectModal"

export default function browseNfts() {
    const { chainId, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : null
    const marketplaceAddress =
        chainId && networkMapping[chainString]
            ? networkMapping[chainString].NftMarketplace[0]
            : null
    const [option, setOption] = useState(false)
    const [isModal, setIsModal] = useState(false)

    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)

    function handleOption() {
        const value = !option
        setOption(value)
    }

    return isWeb3Enabled ? (
        marketplaceAddress ? (
            <div className="mx-10">
                <div className="flex font-bold text-3xl justify-center mt-10 font-sourceCodePro">
                    Browse All NFTs
                </div>
                <div className="flex justify-end mt-5 mb-14">
                    <Dropdown
                        onChange={handleOption}
                        label="Sort By Price: "
                        options={[
                            {
                                id: 0,
                                label: "High to Low",
                                value: 0,
                            },
                            {
                                id: 1,
                                label: "Low to High",
                                value: 1,
                            },
                        ]}
                        defaultOptionIndex={0}
                    />
                </div>
                <div className="flex flex-wrap justify-center">
                    {isWeb3Enabled ? (
                        loading || !listedNfts ? (
                            <div>Loading...</div>
                        ) : option == false ? (
                            listedNfts.priceHigh.map((nft) => {
                                console.log(nft)
                                const { price, nftAddress, tokenId, seller } = nft
                                return (
                                    <div
                                        className={`p-5 mb-10 ${
                                            isModal ? null : "hover:scale-110"
                                        }`}
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
                        ) : (
                            listedNfts.priceLow.map((nft) => {
                                console.log(nft)
                                const { price, nftAddress, tokenId, seller } = nft
                                return (
                                    <div
                                        className={`p-5 mb-10 ${
                                            isModal ? null : "hover:scale-110"
                                        }`}
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
                        <ConnectModal />
                    )}
                </div>
            </div>
        ) : (
            <div className="text-center flex justify-center font-sourceCodePro font-bold text-black text-xl m-20 md:mt-48">
                Network not currently supported... please switch to Goerli Testnet.
            </div>
        )
    ) : (
        <ConnectModal />
    )
}
