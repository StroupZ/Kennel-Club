# Kennel Club NFT Marketplace
Demo: https://kennel-club.vercel.app/
<br>
Link to backend: https://github.com/StroupZ/Kennel-Club-Backend
<br>
Link to graph indexer: https://github.com/StroupZ/Kennel-Club-Graph
<br><br>
This is the Kennel Club NFT Marketplace... a dApp which enables the buying, listing, managing, browsing, and selling of NFTs. Kennel Club is currently deployed to the blockchain on Goerli Testnet, ensuring its decentralization, transparency, and immutability. In order to interact with the marketplace, a user only needs access to a Web3 wallet such as Metamask, and some amount of the appropriate currency to enable transactions. Once connected to the correct network, users will see the homepage, displaying the most recently listed NFTs on the marketplace. NFTs are framed as a card with a gloss finish and showcased with a beautiful glow. Mousing over NFT cards will display a differing tooltip depending on whether the user is the owner. If the user owns the NFT, clicking on it will open a modal which provides functionality such as removing the listing and changing the list price. Clicking on an NFT when the user is not the owner will open a modal enabling them to purchase the NFT. The header allows the user to navigate to another page which features the ability to view all listed NFTs, as well as sort them by ascending or descending price. Should the user wish to return home, they can select the appropriate link in the header, or click the Kennel Club symbol for a more stylistic navigation. Two modals can be accessed from the header... one for setting a price and listing any NFTs a user wishes to sell, and the other for viewing and withdrawing any proceeds a user may have accrued from successful sales.
<br><br>
## Tech Stack
- JavaScript for primary language
- React for UI
- Next.js for for deployment
- Vercel for deployment
- Tailwind CSS for styling
- Web3UIKit for styling
- Moralis for Web3
- Ethers.js for blockchain interaction
- The Graph protocol for indexing
- GraphQL for querying
<br><br>
## Use
1. Follow the steps [here](https://github.com/StroupZ/Kennel-Club-Backend) for initializing the backend.
2. Follow the steps [here](https://github.com/StroupZ/Kennel-Club-Graph) for initializing the graph indexer.
3. Clone this repo.
4. Run `yarn add` to install all dependencies.
5. Create a `.env` file and add `NEXT_PUBLIC_SUBGRAPH_URL=YOUR_SUBGRAPH_URL` using the url to your marketplace subgraph.
6. In the `constants` folder, make sure `networkMapping.json` has the address for your marketplace.
7. Make sure the `constants` folder contains the correct ABIs for the NFT contract and the marketplace contract.
8. Run `yarn run dev` and open your localhost in your browser.
9. Make sure you have a Web3 wallet such as Metamask to interact with the marketplace.
10. Note that you can optionally run scripts in the [backend](https://github.com/StroupZ/Kennel-Club-Backend) to mint and list NFTs to your marketplace.
<br><br>
## Faucet
- [Goerli ETH](https://goerlifaucet.com/)
<br><br>
## Showcase
Home/Recently Listed
![kennel-club-image](https://github.com/StroupZ/Kennel-Club/assets/119818799/5f8724e2-0b14-407e-b796-0e0beb66d923)
<br><br>
Browse All NFTs
![kennel-club-browse](https://github.com/StroupZ/Kennel-Club/assets/119818799/aaedbe96-54e8-4faa-8660-bc9e151f3143)
<br><br>
Owner Modal
![kennel-club-manage](https://github.com/StroupZ/Kennel-Club/assets/119818799/985a49b4-2a48-42e7-aec1-64a4cd01fa45)
<br><br>
Purchase Modal
![kennel-club-purchase](https://github.com/StroupZ/Kennel-Club/assets/119818799/a6d8f454-7140-4cc2-aab7-743dd3fbe58d)
<br><br>
Sell Modal
![kennel-club-sell](https://github.com/StroupZ/Kennel-Club/assets/119818799/56d4c4a9-348b-4430-b761-77e8b27351de)
<br><br>
Proceeds Modal
![kennel-club-proceeds](https://github.com/StroupZ/Kennel-Club/assets/119818799/221e9d1c-cdfc-4e25-b9b0-de35e21935aa)
<br><br>
Connect Modal
![kennel-club-connect](https://github.com/StroupZ/Kennel-Club/assets/119818799/3e595900-f226-407a-bda0-8cf1cdc9da7e)
