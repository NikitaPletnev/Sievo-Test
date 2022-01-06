import { getData } from "../components/Table/helpers/getter";
import { jest } from "@jest/globals";

jest.useFakeTimers();

it("getData request test", () => {
  expect(
    getData().then((res) => {
      return "category" in res?.[0];
    })
  ).toBeTruthy();
});
