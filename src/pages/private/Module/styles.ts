import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import { Video } from "expo-av";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const ModuleImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
`;

export const ModuleDescription = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  margin-bottom: 24px;
`;

export const LessonsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const LessonCard = styled.TouchableOpacity`
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const LessonThumbnail = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 16px;
`;

export const LessonContent = styled.View`
  flex: 1;
`;

export const LessonTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const LessonDescription = styled.Text``;

export const VideoPlayer = styled(Video)`
  width: 100%;
  height: 200px;
`;

export const NoVideoContainer = styled.View`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.backgroundInput};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const NoVideoText = styled.Text`
  font-size: 16px;
  color: #000;
  text-align: center;
`;

export const CompleteButton = styled.TouchableOpacity`
  background-color: #4caf50;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  align-items: center;
`;

export const CompleteButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const ModalDescription = styled.Text`
  margin-top: 16px;
  font-size: 16px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
