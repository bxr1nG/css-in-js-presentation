import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useTitleRandom } from "../queries";

export const RandomButton: FC = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useTitleRandom();

  const clickRandom = async () => {
    const title = await mutateAsync(undefined);
    navigate(`/anime/${title.id}`);
  };

  return (
    <LoadingButton
      variant="contained"
      loading={isPending}
      onClick={clickRandom}
    >
      Случайное
    </LoadingButton>
  );
};
