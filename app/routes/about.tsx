import { InfoGrid, InfoHeading, InfoParagraph, InfoSection } from '~/components/Info'
import Spacer from '../components/Spacer'

export default function About() {
  return (
    <div
      style={{
        paddingTop: 66,
        maxWidth: 905,
        margin: '0 auto',
      }}
    >
      <InfoGrid color="var(--about-primary)">
        <InfoHeading text="Overview" />
        <InfoSection>
          <InfoParagraph>
            There are 3 primary things we are attempting to showcase here by running Game of Life on StarkNet:
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph weight={700}>
            It’s a fun and interactive way to introduce new users and developers to smart contracts written in Cairo.
          </InfoParagraph>
          <InfoParagraph>
            With StarkNet, Game of Life transitions can be computed inside the contract, with each of the 225 cells
            living or dying according to the game rules. These rules are enforced by a STARK proof, which then displays
            the game updates to Ethereum - this means the results are guaranteed to be correct.
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph weight={700}>
            It enables users to visualize how a contract moves from one state to another.
          </InfoParagraph>
          <InfoParagraph>
            Every new step in the game is secured by Cairo, the general-purpose turing-complete language that turns
            readable code into sophisticated proofs.
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph weight={700}>It showcases the cheap computation costs that Cairo provides.</InfoParagraph>
          <InfoParagraph>
            With so many steps involved in updating each game state, Game of Life is a good vehicle for demonstrating
            how Cairo specializes in providing cheap computation for smart contracts.
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph italic weight={400}>
            If it is possible to run a computation-heavy game on StarkNet, what other things can you imagine it running?
          </InfoParagraph>
        </InfoSection>
        <InfoHeading text="About game of life" />
        <InfoSection>
          <InfoParagraph>
            Game of Life (also knows as &quot;Life&quot;), devised by British Mathematician John Conway in 1970 is the
            most well known example of a cellular automaton. The original game is often described as being a zero player
            game as it would organically evolve according to the rules and the initial state (which was the only input
            required from a human). Multiplayer variants then emerged where 2 or more players could compete on the same
            grid.
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph>
            The core universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells, each
            of which is in one of two possible states, alive or dead. Every cell interacts with its eight neighbors,
            which either get given life or die in accordance with the rules.
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph>
            This particular version of Game of Life, or GoL2 as it’s called, is somewhat different in that it exists not
            on an infinite grid but on a fixed-sized grid. 15 x 15 to be precise. This means that cells on the edges can
            wrap and reappear on the opposite side of the grid
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph>
            This makes the end-results of the game different from other versions with infinite grids because the edges
            can create interference. With wrapping, new patterns and states are possible - it’s up to you to explore
            them!
          </InfoParagraph>
        </InfoSection>

        <InfoHeading text="About Starknet" />
        <InfoSection>
          <InfoParagraph>
            StarkNet is a scaling solution for Ethereum that makes reduces transactions costs without compromising on
            security.
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph>
            Contracts on StarkNet can hold state and perform computation just like Ethereum. Rather than storing
            everything, StarkNet contracts are converted into proofs, which guarantee the computation of the contract.
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph>
            Proofs are traditionally extremely complex and nuanced things to build. The real breakthrough that StarkNet
            brings to the world is **Cairo**, the language which builds these proofs for you. Writing a program in Cairo
            is extremely accessible and learnable due to it’s similarity with Python. it’s also worth noting that the
            structure of the contracts are similar to that of Solidity contracts.
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph>
            We believe that developers who embrace Cairo will be uniquely positioned have a real meaningful impact as
            they build for the next generation of smart contract users.
          </InfoParagraph>
        </InfoSection>
      </InfoGrid>
    </div>
  )
}
