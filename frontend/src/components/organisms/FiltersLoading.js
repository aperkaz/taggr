import React from "react";
import styled from "styled-components";

import Typography from "../atoms/Typography";
import Loading from "../molecules/Loading";
import dots from "../../statics/dots.svg";

const BorderWrap = styled.div`
  background: url(${dots}) repeat center/auto;

  height: 100%;
  width: 424px;

  box-shadow: 0 0 8px #ccc;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Span = styled.span`
  background: linear-gradient(85.64deg, #ff96ad 0%, #feaf85 91.67%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Filters = ({ processed = 0, total = 0 }) => {
  return (
    <BorderWrap>
      <div>
        <Loading />
      </div>

      <Typography variant="h5" style={{ marginTop: "3rem" }}>
        Processing memories 🎉
      </Typography>

      <Typography
        variant="h3"
        style={{
          marginTop: "2rem",
        }}
      >
        {processed} <Span /> {total}
      </Typography>
    </BorderWrap>
  );
};

export default Filters;
