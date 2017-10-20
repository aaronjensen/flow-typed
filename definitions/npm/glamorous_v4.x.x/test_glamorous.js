// @flow
import * as React from "react";
import glamorous, { Span, type GlamorousComponent } from "glamorous";

const canBeBlue = ({ isBlue }: { isBlue: boolean }) => ({
  color: isBlue ? "blue" : "red"
});

const margin = ({ ml }: { ml: number }) => ({
  marginLeft: ml
});

glamorous.div({});
// $ExpectError
glamorous.div({ notCSS: true });

(glamorous.div({ color: "red" }): GlamorousComponent<
  React$ElementProps<"div">,
  {}
>);

(glamorous.div(canBeBlue): GlamorousComponent<
  React$ElementProps<"div">,
  { isBlue: boolean }
>);

(glamorous.div(canBeBlue, margin): GlamorousComponent<
  React$ElementProps<"div">,
  { isBlue: boolean, ml: number }
>);

const MyDiv = glamorous.div(canBeBlue);
<MyDiv isBlue />;
// $ExpectError
<MyDiv isBlue={3} />;

(glamorous(MyDiv)(margin): GlamorousComponent<
  React$ElementProps<typeof MyDiv>,
  { isBlue: boolean, ml: number }
>);

(MyDiv.withComponent("span"): GlamorousComponent<
  React$ElementProps<"span">,
  { isBlue: boolean }
>);

glamorous(MyDiv, {
  displayName: "MyGlamorousDiv",
  rootEl: "div",
  filterProps: ["a", "b"],
  forwardProps: ["a", "b"],
  shouldClassNameUpdate: (props, previousProps, context, previousContext) =>
    true,
  propsAreCssOverrides: false,
  withProps: {
    isBlue: true
  }
})();

<Span marginLeft={3} />;
// $ExpectError
<Span marginLeft={{}} />;
<glamorous.Span marginLeft={3} />;

glamorous.div({ ":first-child": { color: "blue" } });
