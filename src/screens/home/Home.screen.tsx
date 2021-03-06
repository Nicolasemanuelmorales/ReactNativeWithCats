import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import loaderAction from "../../redux/actions/LoaderAction";
import { IRootState } from "../../redux/reducers/rootReducer";
import { getRandomCat } from "../../services/homeService";
import styles from "./Home.styles";
import favoritoAction from "../../redux/actions/FavoritoAction";
import colors from "../../../assets/colors";
import Wrapper from "../../components/wrapper/wrapper.components";
import Cat from "../../models/cat";
import Alert from "../../components/alert/alert.components";

export default function Home() {
  const favoritos = useSelector((state: IRootState) => state.favoritos.value);
  const [imageRandom, setImageRandom] = useState<Cat>();
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();

  const getCat = () => {
    dispatch(loaderAction(true));
    getRandomCat()
      .then((resp: Cat[]) => {
        setImageRandom(resp[0]);
      })
      .finally(() => {
        setTimeout(() => dispatch(loaderAction(false)), 1000);
      });
  };

  useEffect(getCat, []);

  return (
    <Wrapper
      refreshControl={getCat}
      child={
        <>
          {imageRandom === undefined ? null : (
            <>
              <Image style={styles.img} source={{ uri: imageRandom.url }} />
              <View style={styles.boxButton}>
                <Button
                  color={colors.BLANCO}
                  contentStyle={styles.button}
                  icon={() => (
                    <Icon name={"redo-alt"} size={16} color={colors.BLANCO} />
                  )}
                  onPress={getCat}
                  children={"Recargar"}
                />

                <Button
                  color={colors.BLANCO}
                  disabled={
                    favoritos.filter((item) => item === imageRandom.url)
                      .length === 0
                      ? false
                      : true
                  }
                  contentStyle={{
                    backgroundColor:
                      favoritos.filter((item) => item === imageRandom.url)
                        .length === 0
                        ? colors.ROJO_PRINCIPAL
                        : colors.ROJO_PRINCIPAL_DISABLE,
                  }}
                  icon={() => (
                    <Icon name={"star"} size={16} color={colors.BLANCO} />
                  )}
                  onPress={() => {
                    setAlert(true),
                      dispatch(favoritoAction([...favoritos, imageRandom.url]));
                  }}
                  children={"Favorito"}
                />
              </View>
              <Alert
                open={alert}
                close={() => setAlert(false)}
                message="Se agrego la imagen a favoritos!"
              />
            </>
          )}
        </>
      }
    />
  );
}
