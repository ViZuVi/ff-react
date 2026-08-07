import { describe, expect, it } from "vitest";

import { getSpaces } from "./get-spaces";

describe("getSpaces API", () => {
  it("returns user spaces", async () => {
    const result = await getSpaces();

    expect(result.status).toBe("success");

    expect(result.spaces).toHaveLength(2);

    expect(result.spaces[0]).toMatchObject({
      id: 1,
      name: "Байчоровы",
    });
  });
});
