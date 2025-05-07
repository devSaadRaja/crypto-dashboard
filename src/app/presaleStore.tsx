import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { getPresaleRound } from "./functions/presale";

const presaleStore = (set: any) => ({
  targetDate: 0,
  status: "Not started yet", // "Not started yet", "Private Round", "Gap Period", "Public Round", "Ended"
  setPresaleData: (presaleRound: [string, number]) => {
    set({
      status: presaleRound[0],
      targetDate: Number(presaleRound[1]),
    });
  },
});

export const usePresaleStore = create(
  devtools(
    persist(presaleStore, {
      name: "presale",
    })
  )
);

const fetchPresaleData = async () => {
  // const { data: presaleRound }: any = getPresaleRound();
  // const presaleRound: [string, number] = ["Private", 1769606585];
  // usePresaleStore.getState().setPresaleData(presaleRound);
};

// Call the function to fetch and update the store
fetchPresaleData();
