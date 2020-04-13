import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";

const StartPage = view(({ onSelectRootFolderPath }) => (
  <Wrapper>
    <Main>
      <h1 className="title is-1" style={{ marginBottom: "80px" }}>
        Welcome to Privatus!
      </h1>
      <p>
        The next gen AI-powered <b>privacy-focused photo experience</b>
        <br />
        Rediscover your photos while <b>keeping your privacy</b> 🛡️
      </p>
      <button onClick={async () => await onSelectRootFolderPath()}>
        Select picture folder
      </button>
    </Main>
  </Wrapper>
));

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Main = styled.main`
  margin: auto;
`;

export default StartPage;
