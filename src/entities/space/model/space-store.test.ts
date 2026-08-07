import { beforeEach, describe, expect, it } from "vitest";

import { useSpaceStore } from "./space-store";

describe("space store", () => {
  beforeEach(() => {
    localStorage.clear();

    useSpaceStore.setState({
      currentSpaceId: null,
    });
  });

  it("has null currentSpaceId initially", () => {
    expect(useSpaceStore.getState().currentSpaceId).toBe(null);
  });

  it("sets current space id", () => {
    useSpaceStore.getState().setCurrentSpaceId("1");

    expect(useSpaceStore.getState().currentSpaceId).toBe("1");
  });

  it("persists current space id", () => {
    useSpaceStore.getState().setCurrentSpaceId("5");

    const saved = localStorage.getItem("space-storage");

    expect(saved).toContain("5");
  });
});
