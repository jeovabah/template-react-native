import { Layout } from "@/components/Layout";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useTheme } from "styled-components/native";
import { ContainerLogoSup } from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { useReducerForm } from "@/hooks/form/reducerForm";
import { useSession } from "@/providers/SessionProvider";
import { navigate } from "@/routes/utils";
import { updateRegisterStore } from "@/stores/RegisterStore";
import { showToast } from "@/utils/toast";
import logo from "../../../../assets/images/clientLogo.png";
import { Carousel } from "@/components/Carousel";
import { getConfigImage } from "@/utils/getConfigImage";
import * as imagesApi from "@/api/images";

export const SignIn = () => {
  const theme = useTheme();
  const { signIn } = useSession();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { form, formSubmit, setFieldValue, setFieldError } = useReducerForm({
    email: { required: true },
    password: { required: true },
    name: { required: activeTab === "signup" },
    confirmPassword: { required: activeTab === "signup" },
  });

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn(form.email.value, form.password.value).finally(() => {
      setIsLoading(false);
    });
  };

  const handleRegister = async () => {
    if (form.name.value.length < 3) {
      setFieldError("name", "Nome deve ter pelo menos 3 caracteres");
      return;
    }
    if (form.password.value !== form.confirmPassword.value) {
      showToast("error", "As senhas não correspondem");
      return;
    }

    updateRegisterStore({
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    });
    navigate("Register");
  };

  const handleSubmit = async () => {
    if (activeTab === "signin") {
      return handleSignIn();
    }
    return handleRegister();
  };

  const fetchImages = async () => {
    try {
      const { data } = await imagesApi.getPublicImages();
      if (data?.status) {
        const imagesData = getConfigImage(1, data?.response);

        setImages([
          ...imagesData.configuration_image_files.map((image) => image.image),
        ]);
      }
    } catch (error) {
      setImages([]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Layout noPadding>
      <S.Container>
        <S.Header>
          <S.Curve
            colors={theme.colors.backgroundGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          <ContainerLogoSup>
            <Carousel images={images} />
          </ContainerLogoSup>
        </S.Header>

        <S.Card>
          <S.TabContainer>
            <S.Tab
              active={activeTab === "signin"}
              onPress={() => setActiveTab("signin")}
            >
              <S.TabText active={activeTab === "signin"}>Entrar</S.TabText>
            </S.Tab>
            <S.Tab
              active={activeTab === "signup"}
              onPress={() => setActiveTab("signup")}
            >
              <S.TabText active={activeTab === "signup"}>Cadastrar</S.TabText>
            </S.Tab>
          </S.TabContainer>

          {activeTab === "signup" && (
            <Input
              placeholder="Nome"
              placeholderTextColor="#666"
              value={form.name.value}
              onChangeText={(value) => setFieldValue("name", value)}
              error={form.name.error}
              size="medium"
            />
          )}

          <Input
            placeholder="Email"
            placeholderTextColor="#666"
            value={form.email.value}
            onChangeText={(value) => setFieldValue("email", value)}
            error={form.email.error}
            size="medium"
          />
          <Input
            placeholder="Senha"
            placeholderTextColor="#666"
            value={form.password.value}
            onChangeText={(value) => setFieldValue("password", value)}
            error={form.password.error}
            variant="password"
            size="medium"
          />

          {activeTab === "signup" && (
            <Input
              placeholder="Confirmar Senha"
              placeholderTextColor="#666"
              value={form.confirmPassword.value}
              onChangeText={(value) => setFieldValue("confirmPassword", value)}
              error={form.confirmPassword.error}
              variant="password"
              size="medium"
            />
          )}

          {activeTab === "signin" && (
            <S.ForgotPassword>Esqueci a senha</S.ForgotPassword>
          )}

          <S.ContainerButton>
            <Button
              size="large"
              onPress={formSubmit(handleSubmit)}
              loading={isLoading}
            >
              {activeTab === "signin" ? "Entrar" : "Cadastrar"}
            </Button>
          </S.ContainerButton>

          <S.OrText>Ou</S.OrText>

          <S.SocialButtonsContainer>
            <S.SocialButton>
              <FontAwesome name="facebook" size={24} color="#4267B2" />
            </S.SocialButton>
            <S.SocialButton>
              <FontAwesome name="google" size={24} color="#DB4437" />
            </S.SocialButton>
            <S.SocialButton>
              <FontAwesome name="apple" size={24} color="#000000" />
            </S.SocialButton>
          </S.SocialButtonsContainer>
        </S.Card>

        <S.LogoInfContainer>
          {/* <LogoInf /> */}
          <S.LogoImage source={logo} resizeMode="contain" />
        </S.LogoInfContainer>
      </S.Container>
    </Layout>
  );
};
