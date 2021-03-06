import React from "react";
import styles from "./alert.styles";
import colors from "../../../assets/colors";
import { Snackbar } from "react-native-paper";

interface IProps {
  close: () => void;
  open: boolean;
  message: string;
}

function DrawerNavigatorContent(IProps) {
  const { close, open, message } = IProps;

  return (
    <Snackbar
      wrapperStyle={{ alignSelf: "center" }}
      style={styles.alert}
      visible={open}
      onDismiss={close}
      duration={1500}
      action={{
        label: "X",
      }}
      theme={{ colors: { accent: colors.BLANCO } }}
      children={message}
    />
  );
}

export default DrawerNavigatorContent;
