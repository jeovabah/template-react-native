import { useSession } from "@/providers/SessionProvider";
import * as S from "../styles";
import React from "react";

export const Header = () => {
  const { user } = useSession();
  return (
    <>
      <S.HeaderContainer>
        <S.HeaderLeft>
          {/* <S.ProfileImage
            source={{ uri: "https://placehold.it/200x200.png" }}
          /> */}
          <S.HeaderTitle>
            {user?.user?.student?.courses?.[0]?.title}
          </S.HeaderTitle>
        </S.HeaderLeft>
        {/* <S.GiftIcon source={{ uri: "https://placehold.it/100x100.png" }} /> */}
      </S.HeaderContainer>

      <S.SubHeaderContainer>
        <S.SubHeaderBox>
          <S.SubHeaderText>Conclusão{"\n"}4%</S.SubHeaderText>
        </S.SubHeaderBox>
        <S.SubHeaderBox>
          <S.SubHeaderText>Categorias{"\n"}1/38</S.SubHeaderText>
        </S.SubHeaderBox>
        <S.SubHeaderBox>
          <S.SubHeaderText>Lições{"\n"}14/335</S.SubHeaderText>
        </S.SubHeaderBox>
      </S.SubHeaderContainer>
    </>
  );
};
