import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTitle, WEB_URL } from "../queries";
import { RandomButton, Container, StatusBar } from "../components";

export const Anime: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data: anime } = useTitle(id || "");

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Container>
      <header>
        <img
          css={{
            height: "40px",
            cursor: "pointer",
            marginRight: "auto",
          }}
          alt="logo"
          src="/icon.webp"
          onClick={() => navigate("/")}
        />
        <RandomButton />
      </header>

      <div
        css={{
          display: "flex",
          gap: "15px",
          alignItems: "flex-start",
          "@media (max-width: 480px)": { flexDirection: "column" },
        }}
      >
        <div
          css={{
            flex: 1,
            position: "relative",
            "@media (max-width: 480px)": { width: "100%" },
            img: { width: "100%", height: "auto" },
          }}
        >
          <img
            alt={anime?.names.ru}
            src={`${WEB_URL}${anime?.posters.medium.url}`}
          />
          {anime?.status.code && (
            <StatusBar status={anime.status.code}>
              {anime?.status.string}
            </StatusBar>
          )}
        </div>

        <div
          css={{
            flex: 2,
            h3: { margin: "0", textAlign: "center" },
            h4: { margin: "0", paddingBottom: "4px" },
            a: {
              display: "block",
              color: "#457cce",
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": { color: "#3864a8", textDecoration: "none" },
            },
          }}
        >
          <h3>{anime?.names.ru}</h3>

          <p>
            Сезон: {anime?.season.year} {anime?.season.string}
          </p>
          <p>Тип: {anime?.type.full_string}</p>
          <p>Жанры: {anime?.genres.join(", ")}</p>

          <p>{anime?.description}</p>

          {anime?.franchises.map((franchise) => (
            <div id={franchise.franchise.id}>
              <h4>{franchise.franchise.name}</h4>

              {franchise.releases.map((release) =>
                release.id === +(id || 0) ? (
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
    </Container>
  );
};
