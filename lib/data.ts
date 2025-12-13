import { mockProperties, type MockProperty, type MockReview } from "./mockData";

export type Property = MockProperty;
export type Review = MockReview;

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));
const normalize = (value?: string) => value?.toLowerCase().trim() ?? "";

const filterProperties = (filter?: string, query?: string) => {
  const normalizedFilter = normalize(filter);
  const normalizedQuery = normalize(query);

  return mockProperties.filter((property) => {
    const matchesFilter =
      !normalizedFilter ||
      normalizedFilter === "all" ||
      property.type.toLowerCase() === normalizedFilter;

    const matchesQuery =
      !normalizedQuery ||
      property.name.toLowerCase().includes(normalizedQuery) ||
      property.address.toLowerCase().includes(normalizedQuery) ||
      property.type.toLowerCase().includes(normalizedQuery);

    return matchesFilter && matchesQuery;
  });
};

export async function getLatestProperties() {
  await wait(350);
  return [...mockProperties]
    .sort(
      (a, b) =>
        new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
    )
    .slice(0, 5);
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  await wait(300);
  const results = filterProperties(filter, query);
  return typeof limit === "number" ? results.slice(0, limit) : results;
}

export async function getPropertyById({ id }: { id: string }) {
  await wait(200);
  return mockProperties.find((property) => property.$id === id) ?? null;
}
