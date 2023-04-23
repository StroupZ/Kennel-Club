import { Modal, Card, useNotification } from "web3uikit"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import { ethers } from "ethers"
import Image from "next/image"

export default function BuyModal({
    isVisible,
    onClose,
    price,
    formattedSellerAddress,
    title,
    description,
    imageURI,
    nftAddress,
    tokenId,
    marketplaceAddress,
}) {
    const dispatch = useNotification()

    const { runContractFunction: buyItem } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "buyItem",
        msgValue: price,
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
    })

    const handleBuyItemSuccess = () => {
        dispatch({
            type: "success",
            title: "Item Bought!",
            position: "topR",
        })
        onClose && onClose()
    }

    return (
        <Modal
            id="BuyModal"
            title={<div className="text-xl italic text-indigo-300 font-bold">Purchase NFT</div>}
            isVisible={isVisible}
            width="400px"
            cancelText="Cancel"
            okText="Buy NFT"
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            onOk={() => {
                buyItem({
                    onError: (error) => {
                        console.log(error)
                    },
                    onSuccess: () => handleBuyItemSuccess(),
                })
            }}
        >
            <div className="flex flex-col items-center">
                <div className="w-fit mb-5">
                    <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-300 to-indigo-300 rounded-[20px] blur"></div>
                        <div className="border-[#888] border-2 rounded-[20px]">
                            <Card title={title} description={description}>
                                <div className="p-2">
                                    <div className="flex flex-col items-end gap-2">
                                        <div>#{tokenId}</div>
                                        <div className="italic text-sm">
                                            Owned by {formattedSellerAddress}
                                        </div>
                                        <Image
                                            loader={() => imageURI}
                                            src={imageURI}
                                            height="200"
                                            width="200"
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
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
