import { FixtureID } from "@/common/types";
import { Fixture } from "@/modules/fixtures/types";
import { QueryClient, useQuery } from "react-query";

export const getFixture = async (fixtureID: FixtureID): Promise<Fixture> => {
  const data = await fetch(`http://localhost:3000/api/fixtures/${fixtureID}`);

  if (!data.ok) {
    return Promise.reject(data.statusText);
  }

  return data.json();
};

export function useFixture(fixtureID: FixtureID) {
  return useQuery<Fixture, Error>(["fixtures", fixtureID], () =>
    getFixture(fixtureID)
  );
}
