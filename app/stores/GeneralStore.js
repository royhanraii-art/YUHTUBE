import { create } from "zustand";



export const useGeneral = create((set)=>({
    ref:null,
    setref:(n)=>set({
        server:n
    })
}))