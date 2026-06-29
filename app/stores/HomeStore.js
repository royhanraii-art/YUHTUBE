import { create } from "zustand";

export const useHomeStore = create((set)=>({
    Movies:[{}],
    TVS:[{}],
    isFetched:false,
    setMovies:(data)=>(set({
        Movies:data
    })),
    setTVS:(data)=>(set({
        TVS:data
    })),
    setFetched:(data)=>(set({
        isFetched:data
    })),
    AddMovies:(data)=>(set((state)=>({
        Movies:[...state.Movies , ...data]
    }))),
     AddTVS:(data)=>(set((state)=>({
        TVS:[...state.TVS , ...data]
    })))
}))