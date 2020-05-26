import React, { useState } from "react";
import TaskProgress from "../molecules/TaskProgress";
import Section from "./Filter";

const Header = ({
  task: {
    isOngoing: isTaskOngoing = false,
    name: taskName = "",
    percentage: taskPercentage = 0,
  },
}) => {
  // TODONOW: manage filter values
  // const [inputValue, setInputValue] = useState("");

  return isTaskOngoing ? (
    <TaskProgress name={taskName} percentage={taskPercentage} />
  ) : (
    <Section />
  );
};

export default Header;
