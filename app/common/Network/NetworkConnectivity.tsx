import { useNetInfo } from "@react-native-community/netinfo";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch } from "@/app/hooks";
import { isUserOnline } from "@/app/redux/user/slice";
import AppText from "../Text/AppText";

const NetworkConnectivity  = () => {
  const netInfo = useNetInfo();
  const dispatch = useAppDispatch();

  const offline = !netInfo.isInternetReachable;

  const onlineColor = "rgba(28, 179, 81, .7)";
  const offlineColor = "rgba(0,0,0,.5)";

  useEffect(() => {
    // If connectivity status has changed
    const isConnected = !offline;
    const prevIsConnected = !!netInfo.isConnected;

    if (isConnected !== prevIsConnected) {
      dispatch(isUserOnline(isConnected));
    }

  }, [dispatch, netInfo, offline]);

  return (
    <View style={[styles.container, { backgroundColor: offline ? offlineColor : onlineColor }]}>
      <AppText style={styles.text}>{offline ? "Offline mode" : "Online"}</AppText>
    </View>
  );
};

export default NetworkConnectivity;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    position: "absolute",
    left: 0,
    right: 0,
  },
  text: {
    color: "white",
    fontSize: 12.5,
  },
});
