import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftAbi from "../constants/BasicNft.json"
import Image from "next/image"
import { Card, Tooltip } from "web3uikit"
import { ethers } from "ethers"
import OwnerModal from "./OwnerModal"
import BuyModal from "./BuyModal"

const truncateStr = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr

    const separator = "..."
    const seperatorLength = separator.length
    const charsToShow = strLen - seperatorLength
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return (
        fullStr.substring(0, frontChars) +
        separator +
        fullStr.substring(fullStr.length - backChars)
    )
}

export default function NFTBox({
    price,
    nftAddress,
    tokenId,
    marketplaceAddress,
    seller,
    setIsModal,
}) {
    const { isWeb3Enabled, account } = useMoralis()
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")
    const [showOwnerModal, setShowOwnerModal] = useState(false)
    const [showBuyModal, setShowBuyModal] = useState(false)

    function hideOwnerModal() {
        setShowOwnerModal(false)
        setIsModal(false)
    }
    function hideBuyModal() {
        setShowBuyModal(false)
        setIsModal(false)
    }

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })

    async function updateUI() {
        const tokenURI = await getTokenURI()
        console.log(`The TokenURI is ${tokenURI}`)
        if (tokenURI) {
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            const tokenURIResponse = await (await fetch(requestURL)).json()
            const imageURI = tokenURIResponse.image
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            setImageURI(imageURIURL)
            setTokenName(tokenURIResponse.name)
            setTokenDescription(tokenURIResponse.description)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const isOwnedByUser = seller === account || seller === undefined
    const formattedSellerAddress = isOwnedByUser ? "you" : truncateStr(seller || "", 15)

    const handleCardClick = () => {
        isOwnedByUser ? setShowOwnerModal(true) : setShowBuyModal(true)
        setIsModal(true)
    }

    return (
        <div>
            <div>
                {imageURI ? (
                    <div>
                        <OwnerModal
                            price={price}
                            formattedSellerAddress={formattedSellerAddress}
                            title={tokenName}
                            description={tokenDescription}
                            imageURI={imageURI}
                            isVisible={showOwnerModal}
                            tokenId={tokenId}
                            marketplaceAddress={marketplaceAddress}
                            nftAddress={nftAddress}
                            onClose={hideOwnerModal}
                        />
                        <BuyModal
                            price={price}
                            formattedSellerAddress={formattedSellerAddress}
                            title={tokenName}
                            description={tokenDescription}
                            imageURI={imageURI}
                            isVisible={showBuyModal}
                            tokenId={tokenId}
                            marketplaceAddress={marketplaceAddress}
                            nftAddress={nftAddress}
                            onClose={hideBuyModal}
                        />
                        <Tooltip
                            position="top"
                            content={isOwnedByUser ? "Manage Listing" : "Buy Me!"}
                            minWidth={isOwnedByUser ? 130 : null}
                        >
                            <Card
                                title={tokenName}
                                description={tokenDescription}
                                onClick={handleCardClick}
                            >
                                <div className="p-2">
                                    <div className="flex flex-col items-end gap-2">
                                        <div>#{tokenId}</div>
                                        <div className="italic text-sm">
                                            Owned by {formattedSellerAddress}
                                        </div>
                                        <Image
                                            loader={() => imageURI}
                                            src={imageURI}
                                            width="200"
                                            height="200"
                                            style={{
                                                height: 200,
                                            }}
                                        />
                                        <div className="font-bold">
                                            {ethers.utils.formatUnits(price, "ether")} ETH
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Tooltip>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}
