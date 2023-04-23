import { Modal, ConnectButton } from "web3uikit"

export default function ConnectModal() {
    return (
        <Modal
            id="ConnectModal"
            width="800px"
            hasFooter={false}
            isVisible={true}
            title={
                <div className="flex flex-grow text-2xl font-sourceCodePro text-center justify-center text-indigo-300 font-bold">
                    Web3 Not Currently Detected!
                </div>
            }
        >
            <div className="flex flex-col items-center">
                <div className="text-center text-xl italic font-bold font-sourceCodePro mb-10">
                    Please connect wallet...
                </div>
                <ConnectButton moralisAuth={false} />
            </div>
        </Modal>
    )
}
