import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";

import { usersHandler, usersHandlerException } from "./mocks/handlers";
const { server } = require("./mocks/server");

describe("Component: App", () => {
  test("renders users when API call succeeds", async () => {
    server.use(usersHandler);

    render(<App />);

    //Loading state displays and gets removed once results are displayed
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();
    expect(await screen.findByText("Ervin Howell")).toBeInTheDocument();
  });

  test("renders no users when API call fails", async () => {
    server.use(usersHandlerException);

    render(<App />);

    expect(
      await screen.findByText("Error fetching data. Try again")
    ).toBeInTheDocument();
  });
});
