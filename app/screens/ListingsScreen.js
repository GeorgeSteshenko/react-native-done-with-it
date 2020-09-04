import React, { useEffect, Fragment } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/AppButton";
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import routs from "../navigation/routs";

import listingsApi from "../api/listings";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingsApi.getListings
  );

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <Fragment>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <Fragment>
            <AppText>Couldn't retrieve the listings</AppText>
            <Button title="Retry" onPress={loadListings} />
          </Fragment>
        )}
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              imageUrl={item.images[0].url}
              thumbnailUrl={item.images[0].thumbnailUrl}
              onPress={() => navigation.navigate(routs.LISTINGS_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
