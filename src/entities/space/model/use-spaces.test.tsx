import { renderHook, waitFor } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { TestQueryProvider } from "@/test/query-client";

import { useSpaces } from "./use-spaces";

describe("useSpaces", () => {
  it("loads spaces", async () => {
    const { result } = renderHook(() => useSpaces(), {
      wrapper: TestQueryProvider,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.spaces).toHaveLength(2);

    expect(result.current.data?.spaces[0].name).toBe("Байчоровы");
  });
});
