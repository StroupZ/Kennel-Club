import { gql } from "@apollo/client"

const GET_ACTIVE_ITEMS = gql`
    {
        mostRecent: activeItems(
            first: 5
            orderBy: id
            orderDirection: desc
            where: { buyer: "0x0000000000000000000000000000000000000000" }
        ) {
            id
            buyer
            seller
            nftAddress
            tokenId
            price
        }

        priceLow: activeItems(
            orderBy: price
            orderDirection: asc
            where: { buyer: "0x0000000000000000000000000000000000000000" }
        ) {
            id
            buyer
            seller
            nftAddress
            tokenId
            price
        }

        priceHigh: activeItems(
            orderBy: price
            orderDirection: desc
            where: { buyer: "0x0000000000000000000000000000000000000000" }
        ) {
            id
            buyer
            seller
            nftAddress
            tokenId
            price
        }
    }
`
export default GET_ACTIVE_ITEMS
