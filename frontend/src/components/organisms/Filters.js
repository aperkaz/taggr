import React from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";

import Typography from "../atoms/Typography";
import FancyButton from "../molecules/FancyButton";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.75);
`;

const Panel = styled.div`
  margin: 0.5em;
  height: calc(100% - 1em);
  width: 30%;

  border-radius: 6px;

  background-color: white;

  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
`;

const Title = styled.div`
  margin-top: 0.25em;

  text-align: center;
`;

const Close = styled(CloseIcon)`
  position: absolute;
  left: calc(30% - 1em);

  margin-top: 0.2em;
`;

const Filters = ({ isOpen = false }) => {
  return (
    <Wrapper>
      <Panel>
        <Title>
          <Close />

          <Typography variant="h5">Filters</Typography>
        </Title>

        <div>filters</div>
        <div>divider</div>
        <div>
          <FancyButton text={"Reset"} />
          <FancyButton text={"Apply"} />
        </div>
      </Panel>
    </Wrapper>
  );
};

export default Filters;
