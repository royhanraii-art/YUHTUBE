import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from '../Components/Loading'
import LiveDetails from '../Components/LiveDetails'

const index = () => {
    const [LoadingState, setLoadingState] = useState(true)
    const [Data, setData] = useState([])

    useEffect(() => {
        fetch("https://player003.vercel.app/api/live")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((data) => {
                setData(data.data)
            })
            .catch((err) => {
                console.error(err);
                alert("Error. Please try again later.");
            })
            .finally(() => {
                setLoadingState(false);
            });
    }, [])

    if (LoadingState) {
        return <Loading />
    }
    return (
        <View 
            style={{
                padding:4,
                gap:4
            }}
        >
            {
                Data?.map((itm , idx)=> <LiveDetails key={idx} data={itm}/>
                )
            }
        </View>
    )
}

export default index