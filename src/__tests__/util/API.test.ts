import { getPrefectures, getPerYear } from "../../util/API";

describe("API test", () => {
  test("prefectures test", async () => {
    const results: any = await getPrefectures();

    expect(results.result[0].prefCode).toBe(1);
    expect(results.result[0].prefName).toBe("北海道");
  });

  test("get per year test", async () => {
    const results: any = await getPerYear(1);

    expect(results.result.data[0].label).toBe("総人口");
  });
});
