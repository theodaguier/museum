import { Text, TextProps } from "./Themed";

export function SuisseRegular(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "SuisseRegular" }]} />
  );
}

export function SuisseBold(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "SuisseBold" }]} />
  );
}
