import { FC, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useTitleSearch, WEB_URL } from "../queries";
import { useNavigate } from "react-router-dom";
import { RandomButton, Container, AnimeGridItem, Chip } from "../components";
import { Anilibria, AnilibriaList } from "../types";

export const Search: FC = () => {
  const [search, setSearch] = useState("");
  const { isFetching, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useTitleSearch(search);
  const navigate = useNavigate();

  const list = useMemo(() => {
    return (data?.pages || []).reduce((acc, page: Anilibria) => {
      return [...acc, ...page.list];
    }, []) as AnilibriaList[];
  }, [data]);

  const handleChange = debounce(setSearch, 1000);

  return (
    <Container>
      <header>
        <input
          css={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
          placeholder="Введите название"
          onChange={(e) => handleChange(e.target.value)}
        />

        {isFetching && <div css={{ alignSelf: "center" }}>Загрузка...</div>}
        <RandomButton />
      </header>

      <main
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 15,
        }}
      >
        {list.map((item) => (
          <AnimeGridItem
            key={item.id}
            onClick={() => navigate(`/anime/${item.id}`)}
          >
            <img
              alt={item.names.ru}
              src={`${WEB_URL}${item.posters.small.url}`}
            />
            <h3>{item.names.ru}</h3>
            <p>{item.type.full_string}</p>

            <Chip position={{ x: "right" }}>{item.in_favorites}</Chip>
            <Chip>{item.status.string}</Chip>
          </AnimeGridItem>
        ))}
      </main>

      {((isFetching && isFetchingNextPage) || (!search && !isFetching)) && (
        <button
          css={{ marginTop: 20, padding: "5px 10px", alignSelf: "center" }}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Загрузка..."
            : hasNextPage
              ? "Загрузить еще"
              : "Нечего грузить"}
        </button>
      )}
    </Container>
  );
};
