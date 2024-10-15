import { FC } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  CircularProgress,
  Link,
} from "@mui/material";
import { useTitle, WEB_URL } from "../queries";
import { RandomButton, StatusBar } from "../components";

export const Anime: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data: anime } = useTitle(id || "");

  if (isLoading) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    );
  }

  return (
    <Box>
      <AppBar position="sticky" color="transparent">
        <Toolbar sx={{ gap: 2 }}>
          <Box
            component="img"
            sx={{
              height: "40px",
              cursor: "pointer",
              marginRight: "auto",
            }}
            alt="logo"
            src="/icon.webp"
            onClick={() => navigate("/")}
          />
          <RandomButton />
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          display: "flex",
          gap: 2,
          py: 2,
          alignItems: "flex-start",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            position: "relative",
            width: { xs: "100%", md: "auto" },
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "auto",
            }}
            alt={anime?.names.ru}
            src={`${WEB_URL}${anime?.posters.medium.url}`}
          />
          {anime?.status.code && (
            <StatusBar status={anime.status.code}>
              {anime?.status.string}
            </StatusBar>
          )}
        </Box>

        <Box
          sx={{
            flex: 2,
            h3: { margin: "0", textAlign: "center" },
            h4: { margin: "0", paddingBottom: "4px" },
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
                  <Link
                    key={release.id}
                    sx={{
                      display: "block",
                    }}
                    as={RouterLink}
                    to={`/anime/${release.id}`}
                  >
                    {release.names.ru}
                  </Link>
                ),
              )}
            </div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
