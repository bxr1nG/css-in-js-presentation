import { FC } from "react";
import { useTitleRandom } from "../queries";
import { useNavigate } from "react-router-dom";

export const RandomButton: FC = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useTitleRandom();

  const clickRandom = async () => {
    const title = await mutateAsync(undefined);
    navigate(`/anime/${title.id}`);
  };

  return <button onClick={clickRandom}>Случайное</button>;
};
