import create from "zustand";

const store = create((set) => ({
  title: "",
  tgl: "",
  text: "",
  setText: (input) => set((state) => ({ text: input })),
  setTitle: (input) => set((state) => ({ title: input })),
  setTgl: (input) => set((state) => ({ tgl: input })),
}));
export { store };
