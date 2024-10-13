import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTitle, WEB_URL } from "../queries";
import { RandomButton } from "../components";

export const Anime: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data: anime } = useTitle(id || "");

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container">
      <header>
        <img
          className="icon"
          alt="logo"
          src="/icon.webp"
          onClick={() => navigate("/")}
        />
        <RandomButton />
      </header>

      <div className="anime-box">
        <div className="poster-box">
          <img
            alt={anime?.names.ru}
            src={`${WEB_URL}${anime?.posters.medium.url}`}
          />
          <div className={`status${anime?.status.code}`}>
            {anime?.status.string}
          </div>
        </div>

        <div className="description-box">
          <h3>{anime?.names.ru}</h3>

          <p>
            Сезон: {anime?.season.year} {anime?.season.string}
          </p>
          <p>Тип: {anime?.type.full_string}</p>
          <p>Жанры: {anime?.genres.join(", ")}</p>

          <p>{anime?.description}</p>

          {anime?.franchises.map((franchise) => (
            <div>
              <h4>{franchise.franchise.name}</h4>

              {franchise.releases.map((release) =>
                release.id === +id ? (
                  <div key={release.id}>{release.names.ru}</div>
                ) : (
                  <a
                    onClick={() => navigate(`/anime/${release.id}`)}
                    key={release.id}
                  >
                    {release.names.ru}
                  </a>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
