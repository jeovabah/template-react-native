import React, { useRef, useEffect, useState } from "react";
import { Text, Animated, Easing } from "react-native";
import * as S from "./styles";

import SkyStarsBG from "@/assets/images/skyStarsBackground.jpeg";
import GlobeBg from "@/assets/svg/GlobeBg";
import * as modulesApi from "@/api/modules";
import { Header } from "./Header";
import { Table } from "./Table";

export interface Module {
  id: number;
  uuid?: string;
  logo: string | null;
  title: string;
  completed: boolean;
  total_lessons: number;
  completed_lessons: number;
}

export interface ModuleItem {
  id: number;
  uuid?: string;
  title: string;
  logo: string | null;
  completed: boolean;
  total_lessons: number;
  completed_lessons: number;
}

export const MyCourse: React.FC = () => {
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(10000);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const fetchModules = async () => {
    try {
      const { data } = await modulesApi.getSelectData();
      if (data.status) {
        const formattedModules = data.response.map(
          (module: Module, index: number) => ({
            title: `Nível ${index + 1} - ${module.title}`,
            logo: module?.logo || "https://placehold.it/200x200.png",
            completed: module?.completed || false,
            uuid: module?.uuid || "f45ddea6-58b0-42b1-b3ef-497a35870980",
            total_lessons: module?.total_lessons || index + 1,
            completed_lessons: module?.completed_lessons || index + 1,
            id: module.id,
          })
        );

        setModules(formattedModules);

        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.loop(
            Animated.sequence([
              Animated.timing(rotateAnim, {
                toValue: 1,
                duration: rotationSpeed,
                easing: Easing.linear,
                useNativeDriver: true,
              }),
            ])
          ),
        ]).start();
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-20deg", "20deg"],
  });

  return (
    <S.Container>
      <S.BackgroundContainerAll source={SkyStarsBG} />

      <Header />

      <S.MainContent>
        <S.GlobeContainer style={{ transform: [{ rotate: spin }] }}>
          <GlobeBg width={500} height={500} />
        </S.GlobeContainer>

        <Table modules={modules} fadeAnim={fadeAnim} />
      </S.MainContent>
    </S.Container>
  );
};
