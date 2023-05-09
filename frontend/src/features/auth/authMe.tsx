import { useCurrentQuery } from "../../app/config/auth";

export const AuthMe = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if(isLoading) {
    return <div>Идет загрузка.....</div>
  }

  return children
}