\
\
![golLanding](https://user-images.githubusercontent.com/5764504/171171394-5f7b5753-6f48-4b5f-96a1-c03d6fb9e222.svg)

Gol2 is an on-chain remix of the classic “Game of Life” by John Conway built on Starknet.

See these two articles on how we built the game

[Gol2: Behind the scenes - Contract + Indexer ](https://medium.com/@r.walsh.21/gol2-behind-the-scenes-pt1-a38e280f63cf) <br>
[Gol2: Behind the scenes - Frontend application](https://medium.com/@r.walsh.21/gol2-behind-the-scenes-pt1-a38e280f63cf)

### Indexer + contract repos

- [The gol2 indexer](https://github.com/yuki-wtf/GoL2-Contract/indexer)
  > Contract directory in this repo is old version.
- [Updated Gol2 and Gol2NFT contracts](https://github.com/0xDegenDeveloper/gol2)

### Deployed contracts

Goerli - ~~[0x06dc4bd1212e67fd05b456a34b24a060c45aad08ab95843c42af31f86c7bd093](https://goerli.voyager.online/contract/0x06dc4bd1212e67fd05b456a34b24a060c45aad08ab95843c42af31f86c7bd093)~~ <br>

> No longer used since it is using cairo v0 contract and does not have a corresponding NFT contract

New goerli contract with NFT

Goerli Gol2: [0x5bd17bba6b3cb9740bcc0f20f93ecf443250c4f09d94e4ab32d3bdffc7ebba2](https://goerli.voyager.online/contract/0x5bd17bba6b3cb9740bcc0f20f93ecf443250c4f09d94e4ab32d3bdffc7ebba2)

Goerli Gol2NFT: [0x41f327d78d8a1a12b64dc67db87fdb4ce21c7e165ff26c339ea02beaa111af4](https://goerli.voyager.online/contract/0x41f327d78d8a1a12b64dc67db87fdb4ce21c7e165ff26c339ea02beaa111af4)

Mainnet Gol2 - [0x06a05844a03bb9e744479e3298f54705a35966ab04140d3d8dd797c1f6dc49d0](https://goerli.voyager.online/contract/0x06a05844a03bb9e744479e3298f54705a35966ab04140d3d8dd797c1f6dc49d0) <br>

Mainnet Gol2NFT - [0x4839f0e690c149ebac61774264b57ed7ec896fa62d395792fd46124b954497f ](https://goerli.voyager.online/contract/0x4839f0e690c149ebac61774264b57ed7ec896fa62d395792fd46124b954497f) <br>

### Docker images

Gol2 frontend application - [https://hub.docker.com/repository/docker/yukilabs/gol2-app
](https://hub.docker.com/repository/docker/yukilabs/gol2-app)<br>
Gol2 Indexer - [https://hub.docker.com/repository/docker/yukilabs/gol2-indexer
](https://hub.docker.com/repository/docker/yukilabs/gol2-indexer)

### Local development

- Make sure you are using node 18 or older version
- Create .env file from .env.example and update values
- If you want to test with a local db, clone indexer repo and run [migrations on local db](https://github.com/yuki-wtf/GoL2-Contract/blob/update-docs/indexer/README.md#local-db-set-up)
- Run `yarn && yarn dev`

### Deploying your own contract

- clone [contract repo](https://github.com/0xDegenDeveloper/gol2/)
- Get your wallet credentials from bravoos or argentx and update .env file.
- To deploy a [goerli contract](https://github.com/0xDegenDeveloper/gol2/blob/main/migration/README.md#goerli), `npm run mock` and next instructions will appear in terminal.

  > You can test whitelist mint but values need to be hardcoded in SnapshotMint component

- To deploy a mock mainnet contract, run `npm run mainnet_mocks` and next instructions will appear in terminal

  > You can not test whitelist mint in mock mainnet contract since proofs are not generated for them. So you can set `MIGRATION_GENERATION_MARKER` to 0 for mock mainnet contracts
