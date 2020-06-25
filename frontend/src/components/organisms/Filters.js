import React, { useState } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// ICONS
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
import ButtonFilter from "../molecules/ButtonFilter";

const BorderWrap = styled.div`
  height: 100%;
  width: 424px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;

  background: linear-gradient(70.98deg, #ff96ad 9.38%, #feaf85 91.67%);

  display: flex;
`;

const Panel = styled.div`
  margin: 4px;

  background: white;

  border-radius: 4px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  /* Enable scroll-behavior, but hide scroll-bar */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Filter = styled.div`
  margin: 1.7rem 1rem;

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
  margin: 0 1rem 1rem;

  display: grid;
  justify-content: start;
  grid-auto-flow: row;

  grid-template-columns: repeat(2, auto);
  grid-gap: 1rem;
`;

const ButtonGrid = styled.div`
  margin: 0 1rem 1rem;

  display: grid;
  justify-content: center;
  grid-auto-flow: row;

  grid-template-columns: repeat(3, auto);
  grid-gap: 1rem;
`;

const FooterDivider = styled.div`
  margin: auto auto 2rem;

  height: 2px;
  width: 80%;

  background: linear-gradient(70.98deg, #fe6b8b 9.38%, #ff8e53 91.67%);
`;

const EMPTY_EPOCH_TIME = null;

const Filters = ({ onFilterChange }) => {
  const [fromDate, setFromDate] = useState(EMPTY_EPOCH_TIME);
  const [toDate, setToDate] = useState(EMPTY_EPOCH_TIME);

  const [activeTags, setActiveTags] = useState({
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

  const fromDateChange = (epochDate) => {
    setFromDate(epochDate);

    triggerSearch({
      fromDate: epochDate,
      toDate: toDate,
      tags: activeTags,
    });
  };

  const toDateChange = (epochDate) => {
    setToDate(epochDate);

    triggerSearch({
      fromDate: fromDate,
      toDate: epochDate,
      tags: activeTags,
    });
  };

  const tagChange = (name) => {
    const newTags = {
      ...activeTags,
      [name]: !activeTags[name],
    };

    setActiveTags(newTags);

    // search on each change
    triggerSearch({
      fromDate: fromDate,
      toDate: toDate,
      tags: newTags,
    });
  };

  const triggerSearch = ({ fromDate, toDate, tags }) => {
    const activeTagsAsList = [];
    Object.keys(tags).forEach((key) => {
      if (tags[key]) {
        activeTagsAsList.push(key);
      }
    });

    onFilterChange({
      fromDate,
      toDate,
      tags: activeTagsAsList,
    });
  };

  const resetState = () => {
    setFromDate(EMPTY_EPOCH_TIME);
    setToDate(EMPTY_EPOCH_TIME);

    // toggle false all filter items
    const resetFilters = { ...activeTags };
    Object.keys(resetFilters).forEach((key) => {
      resetFilters[key] = false;
    });
    setActiveTags(resetFilters);

    triggerSearch({
      fromDate: EMPTY_EPOCH_TIME,
      toDate: EMPTY_EPOCH_TIME,
      tags: [],
    });
  };

  return (
    <BorderWrap>
      <Panel>
        <Typography variant="h5" style={{ margin: "2rem 0 1rem" }}>
          Filters
        </Typography>
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
                    fromDateChange(epochDate);
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
                    toDateChange(epochDate);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  style={{ marginTop: 0 }}
                />
              </TimeSelectoGrid>
            </MuiPickersUtilsProvider>
          </Filter>
          <Filter>
            <FilterTitle>
              <Typography value={"subtitle1"}>what</Typography>
            </FilterTitle>
            <ButtonGrid>
              <ButtonFilter
                icon={<PeopleIcon />}
                text={"People"}
                active={activeTags.people}
                onClick={() => tagChange("people")}
              />
              <ButtonFilter
                icon={<AnimalsIcon />}
                text={"Animals"}
                active={activeTags.animals}
                onClick={() => tagChange("animals")}
              />
              <ButtonFilter
                icon={<VehiclesIcon />}
                text={"Vehicles"}
                active={activeTags.vehicles}
                onClick={() => tagChange("vehicles")}
              />
              <ButtonFilter
                icon={<FoodIcon />}
                text={"Food"}
                active={activeTags.food}
                onClick={() => tagChange("food")}
              />
              <ButtonFilter
                icon={<DrinksIcon />}
                text={"Drinks"}
                active={activeTags.drinks}
                onClick={() => tagChange("drinks")}
              />
              <ButtonFilter
                icon={<SportsIcon />}
                text={"Sports"}
                active={activeTags.sports}
                onClick={() => tagChange("sports")}
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
                onClick={() => tagChange("happy")}
              />
              <ButtonFilter
                icon={<SadIcon />}
                text={"Sad"}
                disabled={true}
                onClick={() => tagChange("sad")}
              />
              <ButtonFilter
                icon={<SurpriseIcon />}
                text={"Surprise"}
                disabled={true}
                onClick={() => tagChange("surprise")}
              />
              <ButtonFilter
                icon={<FearIcon />}
                text={"Fear"}
                disabled={true}
                onClick={() => tagChange("fear")}
              />
              <ButtonFilter
                icon={<AngerIcon />}
                text={"Anger"}
                disabled={true}
                onClick={() => tagChange("anger")}
              />
              <ButtonFilter
                icon={<DisgustIcon />}
                text={"Disgust"}
                disabled={true}
                onClick={() => tagChange("disgust")}
              />
            </ButtonGrid>
          </Filter>
        </Body>
        <FooterDivider />
        <ButtonFancy
          text={"Reset"}
          style={{ width: "70%", margin: "0 auto 2rem" }}
          onClick={resetState}
        />
      </Panel>
    </BorderWrap>
  );
};

//  <Title>
//   <Typography variant="h5">Filters</Typography>
// </Title>
// {/* <Body>
//   <Filter>
//     <FilterTitle>
//       <Typography value={"subtitle1"}>when</Typography>
//     </FilterTitle>
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <TimeSelectoGrid>
//         <KeyboardDatePicker
//           margin="normal"
//           id="date-picker-dialog"
//           label="From date"
//           format="dd/MM/yyyy"
//           value={fromDate}
//           onChange={(date) => {
//             const epochDate = date ? date.getTime() : EMPTY_EPOCH_TIME;
//             setFromDate(epochDate);
//           }}
//           KeyboardButtonProps={{
//             "aria-label": "change date",
//           }}
//           style={{ marginTop: 0 }}
//         />
//         <KeyboardDatePicker
//           margin="normal"
//           id="date-picker-dialog"
//           label="To date"
//           format="dd/MM/yyyy"
//           value={toDate}
//           onChange={(date) => {
//             const epochDate = date ? date.getTime() : EMPTY_EPOCH_TIME;
//             setToDate(epochDate);
//           }}
//           KeyboardButtonProps={{
//             "aria-label": "change date",
//           }}
//           style={{ marginTop: 0 }}
//         />
//       </TimeSelectoGrid>
//     </MuiPickersUtilsProvider>

//     {/* <ButtonGrid>
//         <ButtonFilter
//           icon={<MorningIcon />}
//           text={"Morning"}
//           active={activeFilters.morning}
//           onClick={() => triggerFilter("morning")}
//         />
//         <ButtonFilter
//           icon={<NightIcon />}
//           text={"Night"}
//           active={activeFilters.night}
//           onClick={() => triggerFilter("night")}
//         />
//         <span />
//       </ButtonGrid> */
//       </Filter>
//       <Filter>
//         <FilterTitle>
//           <Typography value={"subtitle1"}>what</Typography>
//         </FilterTitle>
//         <ButtonGrid>
//           <ButtonFilter
//             icon={<PeopleIcon />}
//             text={"People"}
//             active={activeFilters.people}
//             onClick={() => triggerFilter("people")}
//           />
//           <ButtonFilter
//             icon={<AnimalsIcon />}
//             text={"Animals"}
//             active={activeFilters.animals}
//             onClick={() => triggerFilter("animals")}
//           />
//           <ButtonFilter
//             icon={<VehiclesIcon />}
//             text={"Vehicles"}
//             active={activeFilters.vehicles}
//             onClick={() => triggerFilter("vehicles")}
//           />
//           <ButtonFilter
//             icon={<FoodIcon />}
//             text={"Food"}
//             active={activeFilters.food}
//             onClick={() => triggerFilter("food")}
//           />
//           <ButtonFilter
//             icon={<DrinksIcon />}
//             text={"Drinks"}
//             active={activeFilters.drinks}
//             onClick={() => triggerFilter("drinks")}
//           />
//           <ButtonFilter
//             icon={<SportsIcon />}
//             text={"Sports"}
//             active={activeFilters.sports}
//             onClick={() => triggerFilter("sports")}
//           />
//         </ButtonGrid>
//       </Filter>
//       <Filter>
//         <FilterTitle>
//           <Typography value={"subtitle1"}>emotions [comming soon]</Typography>
//         </FilterTitle>
//         <ButtonGrid>
//           <ButtonFilter
//             icon={<HappyIcon />}
//             text={"Happy"}
//             disabled={true}
//             onClick={() => triggerFilter("happy")}
//           />
//           <ButtonFilter
//             icon={<SadIcon />}
//             text={"Sad"}
//             disabled={true}
//             onClick={() => triggerFilter("sad")}
//           />
//           <ButtonFilter
//             icon={<SurpriseIcon />}
//             text={"Surprise"}
//             disabled={true}
//             onClick={() => triggerFilter("surprise")}
//           />
//           <ButtonFilter
//             icon={<FearIcon />}
//             text={"Fear"}
//             disabled={true}
//             onClick={() => triggerFilter("fear")}
//           />
//           <ButtonFilter
//             icon={<AngerIcon />}
//             text={"Anger"}
//             disabled={true}
//             onClick={() => triggerFilter("anger")}
//           />
//           <ButtonFilter
//             icon={<DisgustIcon />}
//             text={"Disgust"}
//             disabled={true}
//             onClick={() => triggerFilter("disgust")}
//           />
//         </ButtonGrid>
//       </Filter>
//       {/* <Filter>
//           <FilterTitle>
//             <Typography value={"subtitle1"}>age [comming soon]</Typography>
//           </FilterTitle>
//           <ButtonGrid>
//             <ButtonFilter
//               icon={<YoungIcon />}
//               text={"Young"}
//               disabled={true}
//             />
//             <ButtonFilter
//               icon={<AdultIcon />}
//               text={"Adult"}
//               disabled={true}
//             />
//             <ButtonFilter icon={<OldIcon />} text={"Old"} disabled={true} />
//           </ButtonGrid>
//         </Filter> */}
//     </Body> */}
//     <div>
//       <FooterDivider />
//       <FooterButtons>
//         <ButtonFancy
//           text={"Reset"}
//           style={{ width: "80%", margin: "1em  auto .5em" }}
//           onClick={() => {
//             resetState();

//             // TODONOW: extract to onChange
//             const activeTags = [];
//             Object.keys(activeFilters).forEach((key) => {
//               if (activeFilters[key]) {
//                 activeTags.push(key);
//               }
//             });
//             triggerSearch({
//               fromDate: fromDate,
//               toDate: toDate,
//               tags: activeTags,
//             });
//           }}
//         />
//       </FooterButtons>
//     </div>

// TODO: imporvement: extract filter config to object and iterate over it

export default Filters;
