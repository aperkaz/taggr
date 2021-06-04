import React from "react";
import { Story, Meta } from "@storybook/react";

import ButtonFancyComp from "./ButtonFancy";
import ButtonRegularComp from "./ButtonRegular";
import ButtonFilterComp from "./ButtonFilter";
import UpdateModalComp from "./UpdateModal";
import ImageTileComp from "./ImageTile";
import TaskProgressComp from "./TaskProgress";
import LoadingComp from "./Loading";

export default {
  title: "Molecules",
  argTypes: { onClick: { action: "clicked" } },
} as Meta;

const TemplateButtonFancy: Story<
  React.ComponentProps<typeof ButtonFancyComp>
> = (args) => <ButtonFancyComp {...args} />;
export const ButtonFancy = TemplateButtonFancy.bind({});
ButtonFancy.args = {
  text: "Press me",
};

const TemplateButtonRegular: Story<
  React.ComponentProps<typeof ButtonRegularComp>
> = (args) => <ButtonRegularComp {...args} />;
export const ButtonRegular = TemplateButtonRegular.bind({});
ButtonRegular.args = {
  text: "Press me",
};

// export const ButtonFilter = () => (
//   <ButtonFilterComp
//     icon={<NightsStay />}
//     text={text("text", "Moon")}
//     active={boolean("active", false)}
//     onClick={action("trigger onClick")}
//   />
// );

// export const UpdateModal = () => (
//   <UpdateModalComp
//     currentAppVersion={text("currentAppVersion", "v0.0.0")}
//     latestAppVersion={text("latestAppVersion", "v0.0.1")}
//     onUpdateSelect={action("trigger update action")}
//   />
// );

// export const TaskProgress = () => (
//   <TaskProgressComp
//     name={text(
//       "taskName",
//       "Be patient, the minions are working on your memories!"
//     )}
//     percentage={number("taskPercentage", 50)}
//   ></TaskProgressComp>
// );

// export const ImageTile = () => (
//   <div style={{ height: "200px", width: "200px", padding: "15px" }}>
//     <ImageTileComp imageUrl="https://images.unsplash.com/photo-1544627836-822bfe450209?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=7500&q=80"></ImageTileComp>
//   </div>
// );

// export const Loading = () => (
//   <FullHeight>
//     <LoadingComp
//       animationDuration={number("animation", 8)}
//       text={text("text", "No pictures found, try to change the filters.")}
//     />
//   </FullHeight>
// );
