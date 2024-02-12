import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "@/components/Themed";
import { SuisseRegular, SuisseBold } from "@/components/StyledText";
import { View } from "react-native";
import { fetchArt } from "@/utils/fetch-art";
import { fetchQuote } from "@/utils/fetch-quote";
import { Quote } from "@/app/(tabs)/_quote/quote";
import { Sheet } from "@tamagui/sheet";

type ArtData = {
  artistDisplayName: string;
  artistDisplayBio: string;
  culture: string;
  objectName: string;
  period: string;
  dynasty: string;
  reign: string;
  portfolio: string;
  artistNationality: string;
  classification: string;
  locale: string;
  country: string;
  objectDate: string;
  rightsAndReproduction: string;
  primaryImage: string;
  primaryImageSmall: string;
};

export default function TabOneScreen() {
  const [artData, setArtData] = useState<ArtData | null>(null);
  const [allObjectIDs, setAllObjectIDs] = useState<number[]>([]);
  const [randomObjectID, setRandomObjectID] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  console.log("artData", artData);

  console.log("randomObjectID", randomObjectID);

  const getRandomObjectID = async () => {
    const randomNumberGenerator =
      allObjectIDs[Math.floor(Math.random() * allObjectIDs.length)];
    setRandomObjectID(randomNumberGenerator);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=9&hasImages=true&q=images"
        );
        const data = await response.json();
        const objectIDs: number[] = data.objectIDs;
        setAllObjectIDs(objectIDs);
      } catch (error) {
        console.error("Error fetching object IDs:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allObjectIDs.length > 0) {
      const randomNumberGenerator =
        allObjectIDs[Math.floor(Math.random() * allObjectIDs.length)];
      setRandomObjectID(randomNumberGenerator);
    }
  }, [allObjectIDs]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (randomObjectID) {
          const response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectID}`
          );
          const data: ArtData = await response.json();

          if (data.primaryImageSmall !== "") {
            setArtData(data);
            setImageLoaded(true); // Set image as loaded since we have data
            setLoading(false);
          } else {
            console.log("Retry fetching - No valid image");

            // Retry fetching if the artwork doesn't have a valid image
            getRandomObjectID();
          }
        }
      } catch (error) {
        console.error("Error fetching artwork data:", error);
        console.log("Retry fetching - Error");
        // Retry fetching if there is an error
        getRandomObjectID();
      }
    };

    fetchData();
  }, [randomObjectID]);

  useEffect(() => {
    setImageLoaded(false);
  }, [artData]);

  const handleImageLoad = () => {
    setLoading(false);
    setImageLoaded(true);
  };
  return (
    <>
      <View className="flex-1 align-middle justify-center py-24 px-4">
        <SuisseBold className="mb-4">⏹︎ Artwork of the Day</SuisseBold>
        <Quote />
        <View className="flex-1 mt-4">
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Image
                className="flex-1 w-full h-full"
                source={{ uri: artData?.primaryImage }}
                contentFit="cover"
              />
              <SuisseRegular className="antialiased mt-2">
                → About
              </SuisseRegular>
            </>
          )}
          {/* {!imageLoaded && loading && (
          <View className="flex-1 absolute top-0 left-0 w-full h-full items-center justify-center bg-white">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )} */}
        </View>
      </View>
      <Sheet open snapPoints={[50, 100]}>
        <Sheet.Frame>
          {/* <View className="flex-1 py-2 bg-gray-100 rounded-lg">
          {art.artistDisplayName && (
            <SuisseRegular>{art.artistDisplayName}</SuisseRegular>
          )}
          {art.artistDisplayBio && (
            <SuisseRegular>{art.artistDisplayBio}</SuisseRegular>
          )}
          {art.culture && <SuisseRegular>{art.culture}</SuisseRegular>}
          {art.objectName && <SuisseRegular>{art.objectName}</SuisseRegular>}
          {art.period && <SuisseRegular>{art.period}</SuisseRegular>}
          {art.dynasty && <SuisseRegular>{art.dynasty}</SuisseRegular>}
          {art.reign && <SuisseRegular>{art.reign}</SuisseRegular>}
          {art.portfolio && <SuisseRegular>{art.portfolio}</SuisseRegular>}
          {art.artistNationality && (
            <SuisseRegular>
              Artist Nationality: {art.artistNationality}
            </SuisseRegular>
          )}
          {art.classification && (
            <SuisseRegular>{art.classification}</SuisseRegular>
          )}
          {art.locale && <SuisseRegular>{art.locale}</SuisseRegular>}
          {art.country && <SuisseRegular>{art.country}</SuisseRegular>}
          {art.objectDate && <SuisseRegular>{art.objectDate}</SuisseRegular>}
          {art.rightsAndReproduction && (
            <SuisseRegular>{art.rightsAndReproduction}</SuisseRegular>
          )}
        </View> */}
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
