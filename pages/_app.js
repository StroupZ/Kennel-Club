import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Head from "next/head"
import { NotificationProvider } from "web3uikit"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import Header from "../components/Header"
import { useEffect, useState } from "react"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
})

function MyApp({ Component, pageProps }) {
    const [showProceedsModal, setShowProceedsModal] = useState(false)
    const [showSellModal, setShowSellModal] = useState(false)
    useEffect(() => {
        setShowProceedsModal(false)
        setShowSellModal(false)
    }, [])

    return (
        <div>
            <Head>
                <title>{"Kennel Club NFTs"}</title>
                <meta name="description" content="Kennel Club NFTs" />
                <link rel="icon" href="/kennel-club.svg" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <ApolloProvider client={client}>
                    <NotificationProvider>
                        <Header
                            setShowSellModal={setShowSellModal}
                            setShowProceedsModal={setShowProceedsModal}
                            showSellModal={showSellModal}
                            showProceedsModal={showProceedsModal}
                        />
                        <Component {...pageProps} />
                    </NotificationProvider>
                </ApolloProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
