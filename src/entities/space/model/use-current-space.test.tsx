import { renderHook, waitFor } from "@testing-library/react";

import { describe, expect, it, beforeEach } from "vitest";

import { TestQueryProvider } from "@/test/query-client";

import { useSpaceStore } from "./space-store";

import { useCurrentSpace } from "./use-current-space";

describe("useCurrentSpace", () => {
  beforeEach(() => {
    useSpaceStore.setState({
      currentSpaceId: null,
    });
  });

  it("loads current space", async () => {
    useSpaceStore.setState({
      currentSpaceId: "1",
    });

    const { result } = renderHook(() => useCurrentSpace(), {
      wrapper: TestQueryProvider,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.data).toMatchObject({
      space: {
        id: Number(1),
        created_at: "2023-08-29 19:58:19",
        name: "Байчоровы",
      },
      categories: [
        {
          id: 1,
          name: "Прочие поступления",
          type: {
            id: 0,
            name: "INCOME",
          },
          icon: "",
        },
        {
          id: 2,
          name: "Прочие расходы",
          type: {
            id: 1,
            name: "EXPENSES",
          },
          icon: "",
        },
        {
          id: 50,
          name: "Зарплата",
          type: {
            id: 0,
            name: "INCOME",
          },
          icon: "",
        },
        {
          id: 51,
          name: "Транспорт",
          type: {
            id: 1,
            name: "EXPENSES",
          },
          icon: "",
        },
      ],
      accounts: [
        {
          id: 22,
          created_at: "2023-09-10 22:45:52",
          name: "Цифра-банк",
          currency: {
            id: 10,
            name: "Российский рубль",
            code: "RUB",
            deleted_at: null,
            rate: "76.1700",
            symbol: "RUB",
          },
          balance: "108177.00",
        },
        {
          id: 47,
          created_at: "2023-10-03 18:05:47",
          name: "Т-банк Зухра",
          currency: {
            id: 10,
            name: "Российский рубль",
            code: "RUB",
            deleted_at: null,
            rate: "76.1700",
            symbol: "RUB",
          },
          balance: "5110.00",
        },
        {
          id: 54,
          created_at: "2023-10-22 12:27:06",
          name: "Т-банк Рашид",
          currency: {
            id: 10,
            name: "Российский рубль",
            code: "RUB",
            deleted_at: null,
            rate: "76.1700",
            symbol: "RUB",
          },
          balance: "2790.42",
        },
      ],
      users: [
        {
          id: 1,
          created_at: "2023-08-29 19:49:39",
          updated_at: "2024-02-19 23:51:54",
          name: "Рашид",
          is_admin: false,
          image: null,
        },
        {
          id: 2,
          created_at: "2023-08-30 11:26:19",
          updated_at: "2026-07-28 20:27:50",
          name: "Zukhra",
          is_admin: false,
          image: null,
        },
      ],
    });
  });

  it("does not fetch without current space id", async () => {
    const { result } = renderHook(() => useCurrentSpace(), {
      wrapper: TestQueryProvider,
    });

    expect(result.current.fetchStatus).toBe("idle");

    expect(result.current.data).toBeUndefined();
  });

  it("updates when current space changes", async () => {
    useSpaceStore.setState({
      currentSpaceId: "1",
    });

    const { result, rerender } = renderHook(() => useCurrentSpace(), {
      wrapper: TestQueryProvider,
    });

    await waitFor(() => {
      expect(result.current.data?.data.space.id).toBe(1);
    });

    useSpaceStore.setState({
      currentSpaceId: "2",
    });

    rerender();

    await waitFor(() => {
      expect(result.current.data?.data.space.id).toBe(2);
    });
  });
});
