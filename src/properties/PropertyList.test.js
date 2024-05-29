import React from "react";
import { render } from "@testing-library/react";
import Properties from "./PropertyList";

it("matches snapshot", function () {
  const { asFragment } = render(<Properties />);
  expect(asFragment()).toMatchSnapshot();
});
