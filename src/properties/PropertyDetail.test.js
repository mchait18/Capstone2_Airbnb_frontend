// import React from "react";
// import { render } from "@testing-library/react";
// import PropertyDetail from "./PropertyDetail";
// import { MemoryRouter, Route } from "react-router-dom";
// import { UserProvider } from "../testUtils";

// it("renders without crashing", function () {
//   render(
//     <MemoryRouter>
//       <UserProvider>
//         <PropertyDetail />
//       </UserProvider>
//     </MemoryRouter>,
//   );
// });

// it("matches snapshot", function () {
//   const { asFragment } = render(
//     <MemoryRouter initialEntries={["/property/test"]}>
//       <UserProvider>
//         <Route path="/properties/:id">
//           <PropertyDetail />
//         </Route>
//       </UserProvider>
//     </MemoryRouter>,
//   );
//   expect(asFragment()).toMatchSnapshot();
// });
