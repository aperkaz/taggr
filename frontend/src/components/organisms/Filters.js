import React, { useState } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// ICONS
import CloseIcon from "@material-ui/icons/Close";
// TODO: feature: add morning/night pictures
// when
// import MorningIcon from "@material-ui/icons/WbSunny";
// import NightIcon from "@material-ui/icons/Brightness2";
// what
import PeopleIcon from "@material-ui/icons/AccessibilityNew";
import AnimalsIcon from "@material-ui/icons/Pets";
import VehiclesIcon from "@material-ui/icons/DriveEta";
import FoodIcon from "@material-ui/icons/Fastfood";
import DrinksIcon from "@material-ui/icons/LocalBar";
import SportsIcon from "@material-ui/icons/SportsSoccer";
// emotions
import HappyIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SadIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SurpriseIcon from "@material-ui/icons/InsertEmoticon";
import FearIcon from "@material-ui/icons/NightsStay";
import AngerIcon from "@material-ui/icons/Whatshot";
import DisgustIcon from "@material-ui/icons/SportsMma";
// age
// import YoungIcon from "@material-ui/icons/ChildCare";
// import AdultIcon from "@material-ui/icons/Face";
// import OldIcon from "@material-ui/icons/SentimentSatisfiedAlt";

import Typography from "../atoms/Typography";
import ButtonFancy from "../molecules/ButtonFancy";
import ButtonRegular from "../molecules/ButtonRegular";
import ButtonFilter from "../molecules/ButtonFilter";

const Backdrop = styled.div`
  z-index: 100;

  position: absolute;
  top: 0;
  right: 0;

  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.75);
`;

const Panel = styled.div`
  z-index: 101;

  position: absolute;
  top: 0;
  left: 0;

  margin: 0.5em;
  height: calc(100vh - 1em);
  width: 480px;

  border-radius: 6px;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  margin-top: 0.25em;
  text-align: center;
`;

const Close = styled(CloseIcon)`
  position: absolute;
  right: calc(100% - 480px);

  margin-top: 0.15em;
  margin-right: 0.25em;

  :hover {
    cursor: pointer;
  }
`;

const Body = styled.div`
  flex-grow: 1;

  /* Enable scroll-behavior, but hide scroll-bar */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Filter = styled.div`
  margin: 1.7em 0.5em;

  border: 2px solid #9f9e9e;
  box-sizing: border-box;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
`;

const FilterTitle = styled.div`
  border: 2px solid #9f9e9e;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 0px 2px;

  background-color: white;
  color: #717171;

  position: relative;
  top: -14px;
  margin: 0 auto;
`;

const TimeSelectoGrid = styled.div`
  margin: 0 1em 1em;

  display: grid;
  justify-content: start;
  grid-auto-flow: row;

  grid-template-columns: repeat(2, auto);
  grid-gap: 1em;
`;

const ButtonGrid = styled.div`
  margin: 0 1em 1em;

  display: grid;
  justify-content: start;
  grid-auto-flow: row;

  grid-template-columns: repeat(3, auto);
  grid-gap: 1em;
`;

const FooterDivider = styled.div`
  margin: 1em auto 0;
  width: 40%;
  border-top: 2px solid #9f9e9e;
`;

const FooterButtons = styled.div`
  display: flex;
`;

const EMPTY_EPOCH_TIME = null;

const Filters = ({ isOpen = false, triggerFiltersClose, triggerSearch }) => {
  const [fromDate, setFromDate] = useState(EMPTY_EPOCH_TIME);
  const [toDate, setToDate] = useState(EMPTY_EPOCH_TIME);

  const [activeFilters, setActiveFilters] = useState({
    // When - date pickers keep their own state
    // morning: false,
    // night: false,
    // What
    people: false,
    animals: false,
    vehicles: false,
    food: false,
    drinks: false,
    sports: false,
    // Emotions
    happy: false,
    sad: false,
    surprise: false,
    fear: false,
    anger: false,
    disgust: false,
  });

  const triggerFilter = (name) => {
    const newFilter = {
      ...activeFilters,
      [name]: !activeFilters[name],
    };

    setActiveFilters(newFilter);
  };

  const resetState = () => {
    setFromDate(EMPTY_EPOCH_TIME);
    setToDate(EMPTY_EPOCH_TIME);

    // toggle false all filter items
    const resetFilters = { ...activeFilters };
    Object.keys(resetFilters).forEach((key) => {
      resetFilters[key] = false;
    });
    setActiveFilters(resetFilters);

    triggerSearch({
      fromDate: EMPTY_EPOCH_TIME,
      toDate: EMPTY_EPOCH_TIME,
      tags: [],
    });
  };

  return (
    <Backdrop style={{ visibility: isOpen ? "visible" : "hidden" }}>
      <Panel>
        <Title>
          <Close onClick={triggerFiltersClose} />
          <Typography variant="h5">Filters</Typography>
        </Title>
        <Body>
          <Filter>
            <FilterTitle>
              <Typography value={"subtitle1"}>when</Typography>
            </FilterTitle>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimeSelectoGrid>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="From date"
                  format="dd/MM/yyyy"
                  value={fromDate}
                  onChange={(date) => {
                    const epochDate = date ? date.getTime() : EMPTY_EPOCH_TIME;
                    setFromDate(epochDate);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  style={{ marginTop: 0 }}
                />
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="To date"
                  format="dd/MM/yyyy"
                  value={toDate}
                  onChange={(date) => {
                    const epochDate = date ? date.getTime() : EMPTY_EPOCH_TIME;
                    setToDate(epochDate);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  style={{ marginTop: 0 }}
                />
              </TimeSelectoGrid>
            </MuiPickersUtilsProvider>

            {/* <ButtonGrid>
              <ButtonFilter
                icon={<MorningIcon />}
                text={"Morning"}
                active={activeFilters.morning}
                onClick={() => triggerFilter("morning")}
              />
              <ButtonFilter
                icon={<NightIcon />}
                text={"Night"}
                active={activeFilters.night}
                onClick={() => triggerFilter("night")}
              />
              <span />
            </ButtonGrid> */}
          </Filter>
          <Filter>
            <FilterTitle>
              <Typography value={"subtitle1"}>what</Typography>
            </FilterTitle>
            <ButtonGrid>
              <ButtonFilter
                icon={<PeopleIcon />}
                text={"People"}
                active={activeFilters.people}
                onClick={() => triggerFilter("people")}
              />
              <ButtonFilter
                icon={<AnimalsIcon />}
                text={"Animals"}
                active={activeFilters.animals}
                onClick={() => triggerFilter("animals")}
              />
              <ButtonFilter
                icon={<VehiclesIcon />}
                text={"Vehicles"}
                active={activeFilters.vehicles}
                onClick={() => triggerFilter("vehicles")}
              />
              <ButtonFilter
                icon={<FoodIcon />}
                text={"Food"}
                active={activeFilters.food}
                onClick={() => triggerFilter("food")}
              />
              <ButtonFilter
                icon={<DrinksIcon />}
                text={"Drinks"}
                active={activeFilters.drinks}
                onClick={() => triggerFilter("drinks")}
              />
              <ButtonFilter
                icon={<SportsIcon />}
                text={"Sports"}
                active={activeFilters.sports}
                onClick={() => triggerFilter("sports")}
              />
            </ButtonGrid>
          </Filter>
          <Filter>
            <FilterTitle>
              <Typography value={"subtitle1"}>
                emotions [comming soon]
              </Typography>
            </FilterTitle>
            <ButtonGrid>
              <ButtonFilter
                icon={<HappyIcon />}
                text={"Happy"}
                disabled={true}
                onClick={() => triggerFilter("happy")}
              />
              <ButtonFilter
                icon={<SadIcon />}
                text={"Sad"}
                disabled={true}
                onClick={() => triggerFilter("sad")}
              />
              <ButtonFilter
                icon={<SurpriseIcon />}
                text={"Surprise"}
                disabled={true}
                onClick={() => triggerFilter("surprise")}
              />
              <ButtonFilter
                icon={<FearIcon />}
                text={"Fear"}
                disabled={true}
                onClick={() => triggerFilter("fear")}
              />
              <ButtonFilter
                icon={<AngerIcon />}
                text={"Anger"}
                disabled={true}
                onClick={() => triggerFilter("anger")}
              />
              <ButtonFilter
                icon={<DisgustIcon />}
                text={"Disgust"}
                disabled={true}
                onClick={() => triggerFilter("disgust")}
              />
            </ButtonGrid>
          </Filter>
          {/* <Filter>
            <FilterTitle>
              <Typography value={"subtitle1"}>age [comming soon]</Typography>
            </FilterTitle>
            <ButtonGrid>
              <ButtonFilter
                icon={<YoungIcon />}
                text={"Young"}
                disabled={true}
              />
              <ButtonFilter
                icon={<AdultIcon />}
                text={"Adult"}
                disabled={true}
              />
              <ButtonFilter icon={<OldIcon />} text={"Old"} disabled={true} />
            </ButtonGrid>
          </Filter> */}
        </Body>
        <div>
          <FooterDivider />
          <FooterButtons>
            <ButtonRegular
              text={"Reset"}
              style={{ width: "100%", margin: "1em .5em 1em 1em" }}
              onClick={resetState}
            />
            <ButtonFancy
              text={"Apply"}
              style={{ width: "100%", margin: "1em  1em 1em .5em" }}
              onClick={() => {
                const activeTags = [];
                Object.keys(activeFilters).forEach((key) => {
                  if (activeFilters[key]) {
                    activeTags.push(key);
                  }
                });
                triggerSearch({
                  fromDate: fromDate,
                  toDate: toDate,
                  tags: activeTags,
                });
                triggerFiltersClose();
              }}
            />
          </FooterButtons>
        </div>
      </Panel>
    </Backdrop>
  );
};

// TODO: imporvement: extract filter config to object and iterate over it
// TODO: improvement: customize button to align closer to the designs: https://material-ui.com/components/buttons/#button

export default Filters;
