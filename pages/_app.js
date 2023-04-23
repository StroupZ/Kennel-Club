import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Head from "next/head"
import { NotificationProvider } from "web3uikit"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
})

function MyApp({ Component, pageProps }) {
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
                        <Component {...pageProps} />
                    </NotificationProvider>
                </ApolloProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
