import { Text, TouchableOpacity } from "react-native";
import * as S from "../styles";
import { ModuleItem } from "..";
import { navigate } from "@/routes/utils";
import React from "react";

export const Table = ({
  modules,
  fadeAnim,
}: {
  modules: ModuleItem[];
  fadeAnim: any;
}) => {
  return (
    <>
      <S.ModulesTrail>
        <S.TrailLine />
        {modules.map((item: ModuleItem, index: number) => {
          const progress = (item.completed_lessons / item.total_lessons) * 100;
          const isLast = index === modules.length - 1;

          return (
            <S.ModuleCardTouchable
              key={index}
              onPress={() => {
                navigate("Module", { module: item });
              }}
            >
              <S.ModuleCard
                style={{
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateX: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                  marginBottom: isLast ? 20 : 35,
                }}
              >
                <S.TrailDot completed={item.completed} />
                <S.TrailConnector />
                <S.ModuleIcon source={{ uri: item?.logo ?? "" }} />
                <S.ModuleInfo>
                  <S.ModuleTitle>{item.title}</S.ModuleTitle>
                  <S.ProgressBar>
                    <S.ProgressFill progress={progress} />
                  </S.ProgressBar>
                  <Text style={{ color: "#fff", fontSize: 11 }}>
                    {item.completed_lessons}/{item.total_lessons}
                  </Text>
                </S.ModuleInfo>
              </S.ModuleCard>
            </S.ModuleCardTouchable>
          );
        })}
      </S.ModulesTrail>
    </>
  );
};
