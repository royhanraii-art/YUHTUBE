import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Dot from './Dot'
import { router } from 'expo-router';


const MovieBar = ({ name, image,realImage,  release_date, rating, type,id }) => {

    const inputDate = new Date(release_date);
    const today = new Date();


    let backdropUrlSmall =`https://image.tmdb.org/t/p/w780${image}`

    if(realImage){
        backdropUrlSmall = realImage
    }
    return (
        <Pressable onPress={()=>{
            router.push(`/details/${id}?type=${type}`)
        }} style={{
            flex: 1,
            height: 250,
            backgroundColor: "rgba(255, 255, 255, 0.11)",
            borderRadius: 8,
            flexDirection: "column",
        }}>
            <Image style={{
                flex:1,
                borderRadius:10
            }} src={image || realImage ?backdropUrlSmall:'https://media.istockphoto.com/id/1980276924/vector/no-photo-thumbnail-graphic-element-no-found-or-available-image-in-the-gallery-or-album-flat.jpg?s=612x612&w=0&k=20&c=ZBE3NqfzIeHGDPkyvulUw14SaWfDj2rZtyiKv3toItk='}></Image>
            <View style={{
                height: 50,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 4
            }}>
                <Image src={image|| realImage?backdropUrlSmall:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYGfUJa163HoBoP0y4ePpOkkHCp8avkmq_5ai-WAhpxjin2I2hq71zFLOi&s=10"} style={{
                    backgroundColor: "white",
                    height: 40,
                    width: 40,
                    borderRadius: 20
                }}>

                </Image>
                <View style={{
                    flex: 1
                }}>
                    <Text style={{
                        color: "white",
                        fontWeight: 500,
                        fontSize: 16
                    }}>
                        {name}
                    </Text>
                    <View style={{
                        flexDirection: "row",
                        gap: 3,
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: "gray",
                            fontWeight: 600,

                        }}>
                            
                        </Text>

                        <Dot />
                        <Text style={{
                            color: "grey",
                            fontSize: 12
                        }}>
                            {release_date}
                        </Text>
                        <Dot />
                        <Text style={{
                            color: "grey",
                            fontSize: 13,
                            fontWeight: 500
                        }}>
                            {type}
                        </Text>

                        <Dot />
                        <Text style={{
                            color: "grey",
                            fontSize: 13,
                            fontWeight: 500
                        }}>
                            ⭐ {rating}
                        </Text>
                        <Dot />
                        <Text >
                            {inputDate < today?'🟢':'🔴'}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default MovieBar