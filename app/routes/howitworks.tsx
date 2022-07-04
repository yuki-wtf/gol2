import { InfoGrid, InfoHeading, InfoImage, InfoList, InfoListItem, InfoParagraph, InfoSection } from '~/components/info'
import Spacer from '../components/Spacer/Spacer'

export default function Howitworks() {
  return (
    <div
      style={{
        paddingTop: 66,
        maxWidth: 905,
        margin: '0 auto',
      }}
    >
      <InfoGrid color="var(--color-section-how-it-works-200)">
        <InfoHeading text="Overview" />
        <InfoSection>
          <InfoParagraph>
            Based on the classic cellular automaton Game of Life (GOL classic), the premise of GoL2 is similar, in that
            the players create an initial configuration on the grid and the cells will then evolve (give life or die)
            based on the game rules.
          </InfoParagraph>
        </InfoSection>
        <InfoHeading text="Game components" />
        <InfoSection>
          <InfoParagraph weight={700}>Grid:</InfoParagraph>
          <InfoParagraph>
            The grid is the surface or points in space on which the game takes place. It’s a 2 dimensional grid made up
            of square cells
          </InfoParagraph>
          <InfoImage
            backgroundColor="rgba(131,232,254,0.1)"
            url="/assets/howitworks/Gridx3.png"
            width={284}
            height={284}
          />
          <InfoParagraph weight={700}>Cells:</InfoParagraph>
          <InfoParagraph>Each cell has two possible states. Alive or dead.</InfoParagraph>
          <InfoImage
            width={144}
            height={89}
            backgroundColor="rgba(131,232,254,0.1)"
            url="/assets/howitworks/Cellsx3.png"
          />
        </InfoSection>
        <InfoHeading text="game rules + behaviors" />
        <InfoSection>
          <InfoParagraph weight={700}>Generations:</InfoParagraph>

          <InfoParagraph>
            Each step in time is called a generation. Think of it as a moment in time where the grid is in a specific
            state. When the grid is evolved (changed to the next state) then the next generation is displayed.
          </InfoParagraph>
          <Spacer />
          <InfoParagraph weight={700}>Evolution, Energy + Cell Behavior:</InfoParagraph>
          <InfoParagraph>
            Every cell interacts with its eight neighbors, which are the cells that are directly horizontally,
            vertically, or diagonally adjacent.
          </InfoParagraph>
          <InfoImage url="/assets/howitworks/Generationsx3.png" width={216} height={216} />
          <InfoParagraph>
            A useful way to think about this is that at any point in time each cell contains either a unit of energy
            (alive) or no energy (dead).{' '}
          </InfoParagraph>
          <Spacer />
          <InfoParagraph>
            As the game is evolved through each generation the state of the cells on the grid is determined as follows:
          </InfoParagraph>
          <Spacer />
          <InfoParagraph>
            Any live cell with fewer than two live neighbors dies, as there is not enough energy for it to survive.
          </InfoParagraph>

          <InfoImage width={284} height={284} url="/assets/howitworks/1.png" />
          <InfoParagraph>
            Any live cell with more than three live neighbors dies, as there is too much energy.
          </InfoParagraph>
          <InfoImage width="360px" height="360px" url="/assets/howitworks/GoL-1.gif" />
          <InfoParagraph>
            Any live cell with two or three live neighbors lives, unchanged, to the next generation as there is
            sufficient energy to maintain life.
          </InfoParagraph>
          <InfoImage width="360px" height="360px" url="/assets/howitworks/GoL-2.gif" />
          <InfoParagraph>Any dead cell with exactly three live neighbors comes to life.</InfoParagraph>
          <InfoImage width="360px" height="360px" url="/assets/howitworks/GoL-3.gif" />
          {/* <InfoParagraph children="To summarise:" weight={700} />
          <InfoImage url="/assets/howitworks/summary.png" width="477px" /> */}
        </InfoSection>
        <InfoHeading text="DIfferences between gol2 + gol classic" />
        <InfoSection>
          <InfoParagraph>The are four primary differences between GoL2 and GoL classic:</InfoParagraph>
          <InfoList>
            <InfoListItem>
              GoL2 is played on a fixed grid (32x32) as opposed to the classic game of life which takes place on an
              infinite grid.
            </InfoListItem>
            <InfoListItem>
              GoL2 allows multiple players to take action on the same grid, which is a variant on the original, which
              was set in single player mode.
            </InfoListItem>
            <InfoListItem>
              In order to interact with the game you must connect a web3 wallet and submit any move you make in the game
              as a transaction to the Starknet blockchain.
            </InfoListItem>
            <InfoListItem>
              In GOL classic users can press “Play” to observe what happens in future generations, in GOL2 the game must
              be evolved one generation at a time and can be evolved by any user.
            </InfoListItem>
          </InfoList>
          <InfoParagraph>The are four primary differences between GoL2 and GoL classic:</InfoParagraph>
          <InfoList>
            <InfoListItem>
              <strong>Infinite mode</strong>
            </InfoListItem>
            <InfoListItem>
              <strong>Creator mode</strong>
            </InfoListItem>
            <InfoListItem>
              <strong>Snapshots</strong>
            </InfoListItem>
          </InfoList>
          <InfoParagraph>Let’s dig into each of them and explain how they work.</InfoParagraph>
        </InfoSection>
        <InfoHeading text="infinite mode" />
        <InfoSection>
          <InfoParagraph>
            Infinite mode is a single game with multiple players and no end point. The goal is to give life to cells
            which in turn will change the course of the game for everyone who is playing.
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph weight={700}>Gameplay:</InfoParagraph>
          <InfoParagraph>In order to give life you must first earn credits, here’s how it works:</InfoParagraph>
          <InfoList>
            <InfoListItem>
              When in infinite mode you can evolve the game via the &apos;Evolve&apos; button. This will take the grid
              in its current state and then progress the game to the next generation, based on the GoL rules.
            </InfoListItem>
            <InfoListItem>For every evolution you make, you will earn 1 credit.</InfoListItem>
            <InfoListItem>
              Each time you evolve the game, a snapshot will be automatically generated and saved in the snapshots area
              (more on this below). This is essentially a unique image which is a representation of your specific move
              in the game.
            </InfoListItem>
            <InfoListItem>You can then use the earned credit to give life to a cell on the grid.</InfoListItem>
            <InfoListItem>
              Any player can then evolve the grid to observe how the cells behave and you can observe how your input
              will impact the game.
            </InfoListItem>
          </InfoList>
        </InfoSection>
        <InfoHeading text="creator mode" />
        <InfoSection>
          <InfoParagraph>
            Creator mode contains multiple games created by the community. You can observe these games or evolve them to
            earn credits. 10 credits gives you the ability to create (or spawn) your own game and share it with
            everybody.{' '}
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph weight={700}>Gameplay:</InfoParagraph>
          <InfoParagraph>
            In order to create your own game you must first earn credits, here’s how it works:
          </InfoParagraph>
          <InfoList>
            <InfoListItem>
              On navigating to the creator mode main screen you are presented with numerous games to choose from.
            </InfoListItem>
            <InfoListItem>
              When you enter into a specific game you can simply observe it being played OR get involved by clicking the
              ‘Evolve’ button. This will take the grid in its current state and then progress the game to the next
              generation, based on the GoL rules.
            </InfoListItem>
            <InfoListItem>
              You can evolve a game via the &apos;Evolve&apos; button. This will take the grid in its current state and
              then progress the game to the next generation, based on the GoL rules.
            </InfoListItem>
            <InfoListItem>For every evolution you make, you will earn 1 credit.</InfoListItem>
            <InfoListItem>
              Once you have earned 10 credits you can then choose to create a new game by clicking on the ‘+ New game”
              button.
            </InfoListItem>
          </InfoList>
        </InfoSection>

        <InfoHeading text="Snapshots" />
        <InfoSection>
          <InfoParagraph>
            Each time you evolve the game in infinite mode a unique snapshot of your play is generated and stored here.
          </InfoParagraph>
          <Spacer size={32} />
          <InfoParagraph weight={700}>Gameplay:</InfoParagraph>
          <InfoParagraph>Browse and share your personal unique GoL2 snapshots.</InfoParagraph>
          <InfoList>
            <InfoListItem>
              Snapshots houses a collection of unique images that represent each evolution play you made in infinite
              mode.
            </InfoListItem>
            <InfoListItem>You can click into an individual snapshot to see it’s details.</InfoListItem>
            <InfoListItem>
              Clicking into a snapshot also gives you the option to share it via social media.
            </InfoListItem>
          </InfoList>
        </InfoSection>
      </InfoGrid>
    </div>
  )
}
