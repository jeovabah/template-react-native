import {
  Text,
  View,
  Modal,
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import { Layout } from "@/components/Layout";
import { ModuleItem } from "../MyCourses";
import { getShowData } from "@/api/modules";
import { ResizeMode } from "expo-av";
import {
  ModuleImage,
  ModuleDescription,
  LessonsTitle,
  LessonCard,
  LessonThumbnail,
  LessonContent,
  LessonTitle,
  LessonDescription,
  VideoPlayer,
  ModalDescription,
  LoadingContainer,
  NoVideoContainer,
  NoVideoText,
  CompleteButton,
  CompleteButtonText,
} from "./styles";
import { goBack } from "@/routes/utils";
import WebView from "react-native-webview";

export interface Lesson {
  id: number;
  uuid: string;
  title: string;
  video_url: string;
  external_link_video: string | null;
  description: string;
  thumbnail: string;
}

interface ModuleDetails extends ModuleItem {
  description: string;
  logo: string;
  lessons: Lesson[];
}

export const Module = ({ route }: any) => {
  const theme = useTheme();
  const moduleParam = route?.params?.module as ModuleItem;
  const [loading, setLoading] = useState(false);
  const [module, setModule] = useState<ModuleDetails | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const getVideoUrl = (videoURL: string) => {
    const youtubeVideo = videoURL.includes("youtube.com");
    const youtubeShared = videoURL.includes("youtu.be");

    if (youtubeVideo) {
      const videoUrl = videoURL?.split("v=")?.[1];
      return `https://www.youtube.com/embed/${videoUrl}`;
    }

    if (youtubeShared) {
      const videoUrl = videoURL?.split("be/")?.[1];
      return `https://www.youtube.com/embed/${videoUrl}`;
    }
    return videoURL;
  };

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        setLoading(true);
        const response = await getShowData(moduleParam?.uuid as string);
        setModule(response?.data?.response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (moduleParam) {
      fetchModuleDetails();
    }
  }, [moduleParam]);

  const handleComplete = () => {
    if (!isCompleted) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsCompleted(true);
      });
    }
  };

  if (!moduleParam) {
    return <Text>Módulo não encontrado</Text>;
  }

  if (loading) {
    return (
      <Layout useHeader title="Carregando...">
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadingContainer>
      </Layout>
    );
  }

  if (!module) {
    return (
      <Layout useHeader title="Erro">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Não foi possível carregar o módulo</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout
      useHeader
      title={`Módulo ${module.title}`}
      onPressBack={() => {
        if (modalVisible) {
          setSelectedLesson(null);
          setModalVisible(false);
        } else {
          goBack();
        }
      }}
    >
      <ScrollView>
        <ModuleImage source={{ uri: module.logo }} />
        <ModuleDescription>{module.description}</ModuleDescription>

        <LessonsTitle>Lições</LessonsTitle>

        {module.lessons.map((lesson) => (
          <LessonCard
            key={lesson.uuid}
            onPress={() => {
              setSelectedLesson(lesson);
              setModalVisible(true);
            }}
          >
            <LessonThumbnail source={{ uri: lesson.thumbnail }} />
            <LessonContent>
              <LessonTitle>{lesson.title}</LessonTitle>
              <LessonDescription numberOfLines={2}>
                {lesson.description}
              </LessonDescription>
            </LessonContent>
          </LessonCard>
        ))}

        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <Layout
            useHeader
            title={selectedLesson?.title}
            onPressBack={() => {
              setSelectedLesson(null);
              setModalVisible(false);
            }}
          >
            <ScrollView>
              {selectedLesson?.external_link_video ? (
                <WebView
                  source={{
                    uri: getVideoUrl(selectedLesson?.external_link_video),
                  }}
                  style={{ width: "100%", height: 300 }}
                />
              ) : selectedLesson?.video_url ? (
                <VideoPlayer
                  source={{ uri: selectedLesson.video_url }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                />
              ) : (
                <NoVideoContainer>
                  <NoVideoText>
                    Esta lição não possui conteúdo em vídeo
                  </NoVideoText>
                </NoVideoContainer>
              )}
              <ModalDescription>{selectedLesson?.description}</ModalDescription>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <CompleteButton
                  onPress={handleComplete}
                  disabled={isCompleted}
                  style={{
                    opacity: isCompleted ? 0.7 : 1,
                    backgroundColor: isCompleted ? "#45a049" : "#4caf50",
                  }}
                >
                  <CompleteButtonText>
                    {isCompleted ? (
                      <>
                        <AntDesign name="checkcircle" size={20} color="white" />{" "}
                        Aula Concluída
                      </>
                    ) : (
                      "Concluir Aula"
                    )}
                  </CompleteButtonText>
                </CompleteButton>
              </Animated.View>
            </ScrollView>
          </Layout>
        </Modal>
      </ScrollView>
    </Layout>
  );
};
