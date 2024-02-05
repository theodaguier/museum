import { View } from "@/components/Themed";
import { SuisseRegular } from "@/components/StyledText";
import { useState, useEffect } from "react";
import { fetchQuote } from "@/utils/fetch-quote";

export type QuoteProps = {
  content: string | null;
  author: string | null;
};

export const Quote = () => {
  const [quote, setQuote] = useState<QuoteProps>({ content: "", author: "" });
  const [author, setAuthor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuoteDetails = async () => {
      setLoading(true);
      try {
        const res = await fetchQuote();
        setQuote(res);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
      setLoading(false);
    };

    fetchQuoteDetails();
  }, []);

  return (
    <View className="flex flex-col space-y-2 bg-gray-100 rounded-lg py-2">
      <SuisseRegular className="antialiased text-3xl break-words text-clip">
        ― {quote.content}
      </SuisseRegular>
      <SuisseRegular className="w-full antialiased">
        {quote.author}
      </SuisseRegular>
    </View>
  );
};
