import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "@/components/Themed";
import { SuisseRegular, SuisseBold } from "@/components/StyledText";
import { View } from "react-native";
import { fetchArt } from "@/utils/fetch-art";
import { fetchQuote } from "@/utils/fetch-quote";

export default function TabOneScreen() {
  const [art, setArt] = useState<any>({});
  const [randomNumber, setRandomNumber] = useState<string>("");
  const [quote, setQuote] = useState<string>("");

  console.log("quote", quote);

  const [loading, setLoading] = useState<boolean>(true);

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  useEffect(() => {
    if (!randomNumber) {
      setRandomNumber(generateRandomNumber(1, 1000).toString());
    }
  }, [randomNumber]);

  console.log("randomNumber", randomNumber);
  console.log("art", art);

  useEffect(() => {
    const fetchQuoteDetails = async () => {
      setLoading(true); // Set loading to true when starting to fetch data
      try {
        const res = await fetchQuote();
        setQuote(res); // Set quote state to the content property
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchQuoteDetails();
  }, []);

  useEffect(() => {
    const fetchArtDetails = async () => {
      setLoading(true); // Set loading to true when starting to fetch data
      const res = await fetchArt(randomNumber);
      if (typeof res === "object" && res !== null) {
        setArt(res);
      } else {
        console.error("Invalid response format");
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    if (!art.primaryImage) {
      fetchArtDetails();
    }
  }, [randomNumber, art.primaryImage]);

  console.log("img", art.primaryImage);

  return (
    <View className="flex flex-col gap-4 flex-1 py-16 px-2">
      <View className="flex flex-col gap-2 bg-gray-100 rounded-lg py-4 px-2">
        <SuisseRegular className="antialiased text-4xl break-words">
          "{quote.content}"
        </SuisseRegular>
        <SuisseRegular className="antialiased">{quote.author}</SuisseRegular>
      </View>
      <Image
        style={{ flex: 1 }}
        source={{ uri: art.primaryImage }}
        contentFit="cover"
        onLoad={() => setLoading(false)} // Set loading to false when the image is loaded
      />
      <View className="bg-gray-100 rounded-lg py-4 px-2">
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loadingIndicator: {
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
