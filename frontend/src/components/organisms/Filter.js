import React, { useState } from "react";
import styled from "styled-components";

// import FancyButton from "../molecules/FancyButton";
import FilterButton from "../molecules/FilterButton";

const Wrapper = styled.div`
  width: 100%;

  display: flex;
`;

const Sections = styled.div`
  /* width: 85%; */
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Section = styled.div`
  margin: 16px 8px;

  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 2px 4px;

  color: #717171;
  background-color: white;

  font-weight: 700;
  font-family: Open Sans;
  font-size: 14px;

  position: relative;
  top: -12px;
  margin-bottom: -6px;
`;

const ButtonWrapper = styled.div`
  margin: 0 8px 8px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Filter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState({
    // WHAT
    // dark: false,
    // bright: false,
    vehicle: false,
    boat: false,
    animal: false,
    food: false,
    drink: false,
    sport: false,
    // WHERE
    nature: false,
    water: false,
    // PEOPLE
    person: false,
  });

  const triggerFilter = (name) => {
    const newFilter = {
      ...activeFilter,
      [name]: !activeFilter[name],
    };

    onFilterChange(newFilter);
    setActiveFilter(newFilter);
  };

  return (
    <Wrapper>
      <Sections>
        {/* <Section>
          <Title>when</Title>
          <ButtonWrapper>
            <FilterButton text="🌙 Nights" />
            <FilterButton text="🌅 Mornings" />
          </ButtonWrapper>
        </Section> */}
        <Section>
          <Title>what</Title>
          <ButtonWrapper>
            {/* <FilterButton
              text="🌚 Dark pics"
              active={activeFilter.dark}
              onClick={() => triggerFilter("dark")}
            />
            <FilterButton
              text="💡 Bright pics"
              active={activeFilter.bright}
              onClick={() => triggerFilter("bright")}
            /> */}
            <FilterButton
              text="😀 People"
              active={activeFilter.person}
              onClick={() => triggerFilter("person")}
            />
            <FilterButton
              text="🚗 Vehicles"
              active={activeFilter.vehicle}
              onClick={() => triggerFilter("vehicle")}
            />
            <FilterButton
              text="🚤 Boat"
              active={activeFilter.boat}
              onClick={() => triggerFilter("boat")}
            />
            <FilterButton
              text=" 🐱 Animals"
              active={activeFilter.animal}
              onClick={() => triggerFilter("animal")}
            />
            <FilterButton
              text="🍜 Food"
              active={activeFilter.food}
              onClick={() => triggerFilter("food")}
            />
            <FilterButton
              text="🍺 Drinks"
              active={activeFilter.drink}
              onClick={() => triggerFilter("drink")}
            />
            <FilterButton
              text="⚽️ Sports"
              active={activeFilter.sport}
              onClick={() => triggerFilter("sport")}
            />
          </ButtonWrapper>
        </Section>
        <Section>
          <Title>where</Title>
          <ButtonWrapper>
            <FilterButton
              text="⛰ Nature"
              active={activeFilter.nature}
              onClick={() => triggerFilter("nature")}
            />
            <FilterButton
              text="🌊 Water"
              active={activeFilter.water}
              onClick={() => triggerFilter("water")}
            />
          </ButtonWrapper>
        </Section>
        <Section>
          <Title>emotions [comming soon]</Title>
          <ButtonWrapper>
            <FilterButton text="🤗 Happy" disabled={true} />
            <FilterButton text="☹️ Sad" disabled={true} />
            <FilterButton text="😲 Surprised" disabled={true} />
            <FilterButton text="😱 Fear" disabled={true} />
            <FilterButton text="😠 Angry" disabled={true} />
          </ButtonWrapper>
        </Section>
      </Sections>
      {/* <div style={{ margin: "auto" }}>
        <FancyButton text="surprise me" />
      </div> */}
    </Wrapper>
  );
};

export default Filter;
