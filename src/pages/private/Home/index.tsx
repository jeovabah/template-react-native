import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";
import { ScrollView } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Carousel } from "@/components/Carousel";
import {
  Container,
  Header,
  ProfileContainer,
  ProfileImage,
  ProfileText,
  WelcomeText,
  SubtitleText,
  MenuButton,
  Carousel as CarouselContainer,
  CardContainer,
  CourseContainer,
  CourseText,
  CourseImage,
} from "./styles";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { navigate, navigateAndReset } from "@/routes/utils";
import { CardAnimated } from "@/components/CardAnimated";
import { useSession } from "@/providers/SessionProvider";
import { Ionicons } from "@expo/vector-icons";
import * as imagesApi from "@/api/images";
import { getConfigImage } from "@/utils/getConfigImage";

export const Home = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { user } = useSession();
  const [images, setImages] = useState<string[]>([]);

  const handleMapEnglish = () => {
    navigateAndReset("MyCourse");
  };

  const handleNotifications = () => {
    navigate("Notifications");
  };

  const fetchImages = async () => {
    const { data } = await imagesApi.getPublicImages();
    if (data?.status) {
      const imagesData = getConfigImage(1, data?.response);

      setImages([
        ...imagesData.configuration_image_files.map((image) => image.image),
      ]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Container>
      <Header>
        <ProfileContainer>
          <Ionicons
            name="person"
            size={24}
            color={"#000"}
            style={{
              marginRight: 10,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 100,
              padding: 10,
            }}
          />
          {/* <ProfileImage source={{ uri: "https://via.placeholder.com/150" }} /> */}
          <ProfileText>
            <WelcomeText>Olá, {user?.user?.name}</WelcomeText>
          </ProfileText>
        </ProfileContainer>
        <MenuButton
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <FontAwesome5 name="bars" size={24} color={theme.colors.primary} />
        </MenuButton>
      </Header>

      <CourseContainer
        colors={["#1665C1", theme.colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1.3 }}
      >
        <CourseText>
          Curso: {user?.user?.student?.courses?.[0]?.title}
        </CourseText>
        <CourseImage
          source={{ uri: user?.user?.student?.courses?.[0]?.logo }}
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
        />
      </CourseContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <CarouselContainer>
          <Carousel images={images} />
        </CarouselContainer>

        <CardContainer>
          <CardAnimated
            icon={
              <FontAwesome5
                name="book"
                size={24}
                color={theme.colors.primary}
              />
            }
            title={`Aulas e ${"\n"}avaliações`}
            percentage={"100"}
            onPress={() => handleMapEnglish()}
          />
          <CardAnimated
            icon={
              <MaterialIcons
                name="calendar-today"
                size={24}
                color={theme.colors.primary}
              />
            }
            title={`Calendário${"\n"}acadêmico`}
            onPress={() => handleMapEnglish()}
          />
          <CardAnimated
            icon={
              <FontAwesome5
                name="chart-bar"
                size={24}
                color={theme.colors.primary}
              />
            }
            title={`Notas e ${"\n"}Histórico`}
            onPress={() => handleMapEnglish()}
          />

          <CardAnimated
            icon={
              <MaterialIcons
                name="notifications"
                size={24}
                color={theme.colors.primary}
              />
            }
            title="Notificações"
            onPress={() => {
              handleNotifications();
            }}
            percentage={"75"}
          />
        </CardContainer>
      </ScrollView>
    </Container>
  );
};
