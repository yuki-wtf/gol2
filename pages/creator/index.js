import { useRouter } from "next/router";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import ContainerInner from "../../components/Layout/ContainerInner";
import PageIntro from "../../components/PageIntro/PageIntro";
import SnapshotCreator from "../../components/Snapshot/SnapshotCreator";
import Typography from "../../components/Typography/Typography";
import { updateGenerations } from "../../features/Infinite/generations/generationsSlice";
import { creator } from "../../styles/themes/creator";
const Creator = () => {
  const { generations } = useSelector((state) => state.generations);
  const dispatch = useDispatch();
  const Router = useRouter();

  console.log(generations);
  return (
    <ThemeProvider theme={creator}>
      <ContainerInner maxWidth={1000}>
        <PageIntro.Container>
          <PageIntro.Icon color="#8AED9B" />
          <PageIntro.Text>
            Create your own games by evolving the communities games. <br />
            Earn 10 credits and you can spawn a brand new game.
          </PageIntro.Text>
        </PageIntro.Container>
        <Typography.H2>Community Games</Typography.H2>

        <div
          style={{ display: "flex", gap: 0, flexWrap: "wrap", marginTop: 24 }}
        >
          {[1, 2, 3, 4].map((item) => (
            <SnapshotCreator
              onClick={() => Router.push(`/creator/${item}`)}
              key={item}
              id={item}
              generationNumber={12}
              address="23232323423423423423432"
            />
          ))}
        </div>
      </ContainerInner>
    </ThemeProvider>
  );
};

export default Creator;
