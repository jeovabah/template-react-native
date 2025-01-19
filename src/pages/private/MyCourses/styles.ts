import { Animated } from "react-native";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const BackgroundContainerAll = styled.ImageBackground.attrs({
  resizeMode: "cover",
})`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  opacity: 0.8;
`;

export const GlobeContainer = styled(Animated.View)`
  position: absolute;
  left: -42%;
  top: ${height / 2.5 - 250}px;
  opacity: 0.7;
  z-index: 1;
`;

export const MainContent = styled.View`
  flex: 1;
  position: relative;
`;

export const ModulesTrail = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 100,
  },
})`
  flex: 1;
  padding: 20px;
  margin-left: 15%;
  z-index: 2;
`;

export const TrailLine = styled.View`
  position: absolute;
  left: 20px;
  top: 20px;
  bottom: 20px;
  width: 3px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 1.5px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
`;

export const ModuleCard = styled(Animated.View)`
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 24px;
  padding: 16px;
  margin-bottom: 35px;
  margin-left: 45px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  flex-direction: row;
  align-items: center;
  width: 90%;
  position: relative;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
`;

export const ModuleCardTouchable = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const TrailDot = styled.View<{ completed: boolean }>`
  position: absolute;
  left: -45px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => (props.completed ? "#4caf50" : "#ccc")};
  border: 3px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 8px rgba(76, 175, 80, 0.6);
`;

export const TrailConnector = styled.View`
  position: absolute;
  left: -35px;
  width: 35px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.2);
`;

export const ModuleIcon = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

export const ModuleInfo = styled.View`
  flex: 1;
`;

export const ModuleTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const ProgressBar = styled.View`
  height: 8px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 6px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
`;

export const ProgressFill = styled.View<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: #4caf50;
  border-radius: 4px;
  box-shadow: 0px 0px 6px rgba(76, 175, 80, 0.4);
`;

export const HeaderContainer = styled.View`
  padding: 50px 24px 0 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 25px;
`;

export const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const GiftIcon = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px;
`;

export const SubHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const SubHeaderBox = styled.View`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 12px;
`;

export const SubHeaderText = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: center;
  font-weight: 600;
`;
