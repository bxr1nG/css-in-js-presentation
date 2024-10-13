import { FC, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useTitleSearch, WEB_URL } from "../queries";
import { useNavigate } from "react-router-dom";
import { RandomButton } from "../components";
import { Anilibria } from "../types";

export const Search: FC = () => {
  const [search, setSearch] = useState("");
  const { isFetching, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useTitleSearch(search);
  const navigate = useNavigate();

  const list = useMemo(() => {
    return (data?.pages || []).reduce((acc, page: Anilibria) => {
      return [...acc, ...page.list];
    }, []);
  }, [data]);

  const handleChange = debounce(setSearch, 1000);

  return (
    <div className="container">
      <header>
        <input
          className="search-box"
          placeholder="Введите название"
          onChange={(e) => handleChange(e.target.value)}
        />
        {isFetching && <div className="loader">Загрузка...</div>}
        <RandomButton />
      </header>

      <main className="anime-grid">
        {list.map((item) => (
          <div
            key={item.id}
            className="anime-item"
            onClick={() => navigate(`/anime/${item.id}`)}
          >
            <img
              alt={item.names.ru}
              src={`${WEB_URL}${item.posters.small.url}`}
            />
            <h3>{item.names.ru}</h3>
            <p>{item.type.full_string}</p>
            <div className="chip right">{item.in_favorites}</div>
            <div className="chip left">{item.status.string}</div>
          </div>
        ))}
      </main>

      {((isFetching && isFetchingNextPage) || (!search && !isFetching)) && (
        <button
          className="load-more-button"
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
    </div>
  );
};
