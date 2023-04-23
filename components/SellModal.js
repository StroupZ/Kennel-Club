import { Form, useNotification, Modal } from "web3uikit"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import nftAbi from "../constants/BasicNft.json"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import networkMapping from "../constants/networkMapping.json"
import { useState } from "react"

export default function SellModal({ isVisible, onClose }) {
    const { chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString]
        ? networkMapping[chainString].NftMarketplace[0]
        : null
    const dispatch = useNotification()
    const [loading, setLoading] = useState(false)

    const { runContractFunction } = useWeb3Contract()

    async function approveAndList(data) {
        console.log("Approving...")
        setLoading(true)
        const nftAddress = data.data[0].inputResult
        const tokenId = data.data[1].inputResult
        const price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString()

        const approveOptions = {
            abi: nftAbi,
            contractAddress: nftAddress,
            functionName: "approve",
            params: {
                to: marketplaceAddress,
                tokenId: tokenId,
            },
        }

        await runContractFunction({
            params: approveOptions,
            onSuccess: (tx) => handleApproveSuccess(tx, nftAddress, tokenId, price),
            onError: (error) => {
                console.log(error)
            },
        })
    }

    async function handleApproveSuccess(tx, nftAddress, tokenId, price) {
        console.log("Time to list")
        await tx.wait()
        const listOptions = {
            abi: nftMarketplaceAbi,
            contractAddress: marketplaceAddress,
            functionName: "listItem",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
                price: price,
            },
        }

        await runContractFunction({
            params: listOptions,
            onSuccess: () => handleListSuccess(),
            onError: (error) => console.log(error),
        })
    }

    async function handleListSuccess() {
        dispatch({
            type: "success",
            title: "NFT Listed!",
            position: "topR",
        })
        window.location.reload(false)
    }

    return (
        <div>
            <Modal
                id="SellModal"
                title={
                    <div className="text-2xl text-indigo-300 italic font-bold font-sourceCodePro">
                        Sell NFTs
                    </div>
                }
                isVisible={isVisible}
                width="400px"
                onCloseButtonPressed={onClose}
                hasFooter={false}
            >
                <Form
                    onSubmit={approveAndList}
                    buttonConfig={{
                        isLoading: loading ? true : false,
                        theme: "colored",
                        loadingText: "Please Wait...",
                    }}
                    data={[
                        {
                            name: "NFT Address",
                            type: "text",
                            value: "",
                            key: "nftAddress",
                            validation: {
                                required: true,
                            },
                        },
                        {
                            name: "Token ID",
                            type: "number",
                            value: "",
                            key: "tokenId",
                            validation: {
                                required: true,
                            },
                        },
                        {
                            name: "Price (in ETH)",
                            type: "number",
                            value: "",
                            key: "price",
                            validation: {
                                required: true,
                            },
                        },
                    ]}
                    title={
                        <div className="font-sourceCodePro text-center text-xl">
                            List Your NFT!
                        </div>
                    }
                    id="Main Form"
                />
            </Modal>
        </div>
    )
}
