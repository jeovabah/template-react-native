import { useSession } from "@/providers/SessionProvider";
import { ActivityIndicator } from "react-native";
import { PublicRoutes } from "./public";
import { PrivateRoutes } from "./private";

export const Routes = () => {
  const { isLoading, session } = useSession();

  if (isLoading) return <ActivityIndicator />;

  if (session) return <PrivateRoutes />;

  return <PublicRoutes />;
};
