import { Modal, Input, Card, useNotification } from "web3uikit"
import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import { ethers } from "ethers"
import Image from "next/image"

export default function OwnerModal({
    price,
    formattedSellerAddress,
    title,
    description,
    imageURI,
    nftAddress,
    tokenId,
    isVisible,
    marketplaceAddress,
    onClose,
}) {
    const dispatch = useNotification()

    const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0)

    const handleUpdateListingSuccess = () => {
        dispatch({
            type: "success",
            title: "Listing Updated!",
            position: "topR",
        })
        onClose && onClose()
        setPriceToUpdateListingWith("0")
    }

    const handleCancelListingSuccess = () => {
        dispatch({
            type: "success",
            title: "Listing Cancelled!",
            position: "topR",
        })
        onClose && onClose()
    }

    const { runContractFunction: updateListing } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "updateListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0"),
        },
    })

    const { runContractFunction: cancelListing } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "cancelListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
    })

    return (
        <Modal
            id="OwnerModal"
            title={<div className="text-xl italic text-indigo-300 font-bold">Manage Listing</div>}
            isVisible={isVisible}
            width="400px"
            cancelText="Cancel Listing"
            okText="Update Price"
            onCancel={() => {
                cancelListing({
                    onError: (error) => {
                        console.log(error)
                    },
                    onSuccess: () => handleCancelListingSuccess(),
                })
            }}
            onCloseButtonPressed={onClose}
            isOkDisabled={priceToUpdateListingWith > 0 ? false : true}
            onOk={() => {
                updateListing({
                    onError: (error) => {
                        console.log(error)
                    },
                    onSuccess: () => handleUpdateListingSuccess(),
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
                <Input
                    label="Update listing price in L1 currency (ETH)"
                    name="New listing price"
                    type="number"
                    onChange={(event) => {
                        setPriceToUpdateListingWith(event.target.value)
                    }}
                />
            </div>
        </Modal>
    )
}
