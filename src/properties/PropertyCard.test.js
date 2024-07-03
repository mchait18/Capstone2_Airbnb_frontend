import React from "react";
import { render } from "@testing-library/react";
import PropertyCard from "./PropertyCard";
import { MemoryRouter } from "react-router";


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <PropertyCard
      />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
