import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import PlayerWebView from "../../Components/PlayerWebView";


export default function Watch() {
    const { uris, embed } = useLocalSearchParams();

    const sources = uris ? JSON.parse(uris) : [];

    const [selected, setSelected] = useState(embed);

    const url = useMemo(() => {
        return selected==embed ? `https://player003.vercel.app/live?uriId=${embed}`:`https://player003.vercel.app/live?uri=${encodeURIComponent(
            selected
        )}`;
    }, [selected]);

    return (
        <View style={{flex:1, backgroundColor: "black" }}>
            <PlayerWebView url={url} />
            <Picker
                selectedValue={selected}
                onValueChange={(value) => setSelected(value)}
                style={{ color: "white", backgroundColor: "black" ,gap:3 ,borderWidth:1 , borderColor:"grey",borderRadius:6}}
                dropdownIconColor="white" // Android
            >
                <Picker.Item label="Default" style={{
                    color: "white",
                    backgroundColor: "black"
                }} value={embed} color="white" />

                {sources.map((item, index) => (
                    <Picker.Item
                        style={{
                            color: "white",
                            backgroundColor: "black"
                        }}
                        key={index}
                        label={item.name || `Server ${index + 1}`}
                        value={item.embed}
                        color="white"
                    />
                ))}
            </Picker>
        </View>
    );
}