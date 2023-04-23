import { useNotification, Modal } from "web3uikit"
import { useMoralis, useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import networkMapping from "../constants/networkMapping.json"
import { useEffect, useState } from "react"
import { ethers } from "ethers"

export default function ProceedsModal({ isVisible, onClose }) {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString]
        ? networkMapping[chainString].NftMarketplace[0]
        : null
    const dispatch = useNotification()
    const [proceeds, setProceeds] = useState("0")
    const proceedsConverted = ethers.utils.formatEther(proceeds).toString()

    const { runContractFunction: withdrawProceeds } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "withdrawProceeds",
        params: {},
    })

    const { runContractFunction: getProceeds } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "getProceeds",
        params: {
            seller: account,
        },
    })

    const handleWithdrawSuccess = () => {
        dispatch({
            type: "success",
            title: "Withdrawing Proceeds!",
            position: "topR",
        })
        onClose && onClose()
    }

    async function setupUI() {
        const returnedProceeds = await getProceeds({
            onError: (error) => console.log(error),
        })
        if (returnedProceeds) {
            setProceeds(returnedProceeds.toString())
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            setupUI()
        }
    }, [proceeds, account, isWeb3Enabled, chainId])

    return (
        <div>
            <Modal
                id="ProceedsModal"
                width="400px"
                title={
                    <div className="italic text-xl font-bold font-sourceCodePro">
                        Your Proceeds:
                    </div>
                }
                isVisible={isVisible}
                onCloseButtonPressed={onClose}
                okText="WithdrawProceeds"
                cancelText="Cancel"
                onCancel={onClose}
                onOk={() => {
                    withdrawProceeds({
                        onError: (error) => {
                            console.log(error)
                        },
                        onSuccess: () => handleWithdrawSuccess(),
                    })
                }}
                isOkDisabled={proceedsConverted > 0 ? false : true}
            >
                <div className="flex flex-row justify-center">
                    <p className="text-center font-bold text-5xl pr-1 text-indigo-300">
                        {proceedsConverted}
                    </p>
                    <p className="italic font-sourceCodePro">ETH</p>
                </div>
            </Modal>
        </div>
    )
}
