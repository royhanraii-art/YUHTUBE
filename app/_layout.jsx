import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import Navbar from "./Components/Navbar";
import { useEffect, useRef, useState } from "react";
import Menu from "./Components/Menu";
import Dot from "./Components/Dot";
import Loading from "./Components/Loading";
import api from "./api";
import { useHomeStore } from "./stores/HomeStore";
import { useGeneral } from "./stores/GeneralStore";


export default function RootLayout() {
    const [showMenu, setshowMenu] = useState(false)
    const [LoadingState, setLoadingState] = useState(true)
    const { setMovies, setTVS, setFetched } = useHomeStore()

    const scrollRef = useRef()

    const {setref,ref} = useGeneral()

    useEffect(() => {
        
        setLoadingState(true)
        api.get('trending/movie/week')
            .then((data) => {
                let fetched = data.data.results
                setMovies(fetched)
            }).
            catch((er) => {
                alert("sOME ERROR OCCURED")
            }).
            finally(() => {
                setLoadingState(false)
            })
    }, [])

    const [isFetchingTv, setisFetchingTv] = useState(true)
    useEffect(() => {

        setisFetchingTv(true)
        api.get('trending/tv/week')
            .then((res) => {
                setFetched(true)
                setTVS(res.data.results)
            }).finally(() => {
                setisFetchingTv(false)
            })
    }, [])

    useEffect(()=>{
        if(ref){
            return
        }
        setref(ref)
    },[scrollRef ,ref])
    return (
        <SafeAreaView ref={scrollRef} style={{ flex: 1, backgroundColor: "#000" }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#000",
                }}
            >
                <Navbar showMenu={showMenu} setshowMenu={setshowMenu} />
                {showMenu &&
                    <Menu setshowMenu={setshowMenu}/>
                }
                <ScrollView>
                    {LoadingState || isFetchingTv ? <Loading /> : <Slot />}
                </ScrollView>
            </View>
            <Text style={{
                textAlign: "center",
                color: 'gray',
                fontWeight: "700",
                fontSize: 12
            }}>
                <Dot /> Made By Prajwal Neupane <Dot />
            </Text>
        </SafeAreaView>
    );
}