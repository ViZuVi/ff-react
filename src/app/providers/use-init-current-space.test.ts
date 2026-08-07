import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useSpaceStore } from "@/entities/space";

import { TestQueryProvider } from "@/test/query-client";

import { useInitCurrentSpace } from "./use-init-current-space";

describe("useInitCurrentSpace", () => {
  beforeEach(() => {
    localStorage.clear();

    useSpaceStore.setState({
      currentSpaceId: null,
    });
  });

  it("sets the first space when current space is not selected", async () => {
    renderHook(() => useInitCurrentSpace(), {
      wrapper: TestQueryProvider,
    });

    await waitFor(() => {
      expect(useSpaceStore.getState().currentSpaceId).toBe("1");
    });
  });

  it("keeps current space when it still exists", async () => {
    useSpaceStore.setState({
      currentSpaceId: "2",
    });

    renderHook(() => useInitCurrentSpace(), {
      wrapper: TestQueryProvider,
    });

    await waitFor(() => {
      expect(useSpaceStore.getState().currentSpaceId).toBe("2");
    });
  });

  it("sets the first space when current space no longer exists", async () => {
    useSpaceStore.setState({
      currentSpaceId: "999",
    });

    renderHook(() => useInitCurrentSpace(), {
      wrapper: TestQueryProvider,
    });

    await waitFor(() => {
      expect(useSpaceStore.getState().currentSpaceId).toBe("1");
    });
  });
});
