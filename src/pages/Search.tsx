import { FC, useMemo, useState } from "react";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  TextField,
  CircularProgress,
  debounce,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  Card,
  CardActionArea,
  Badge,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ClearIcon from "@mui/icons-material/Clear";
import { useTitleSearch, WEB_URL } from "../queries";
import { useNavigate } from "react-router-dom";
import { RandomButton, StatusChip } from "../components";
import { Anilibria, AnilibriaList } from "../types";
import { LoadingButton } from "@mui/lab";

export const Search: FC = () => {
  const [internalSearch, setInternalSearch] = useState("");
  const [search, setSearch] = useState("");
  const { isFetching, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useTitleSearch(search);
  const navigate = useNavigate();

  const list = useMemo(() => {
    return (data?.pages || []).reduce((acc, page: Anilibria) => {
      return [...acc, ...page.list];
    }, []) as AnilibriaList[];
  }, [data]);

  const handleChange = useMemo(() => debounce(setSearch, 1000), [setSearch]);

  return (
    <Box>
      <AppBar position="sticky" color="transparent">
        <Toolbar sx={{ gap: 2 }}>
          <TextField
            value={internalSearch}
            fullWidth
            size="small"
            placeholder="Введите название"
            onChange={(e) => {
              setInternalSearch(e.target.value);
              handleChange(e.target.value);
            }}
            slotProps={{
              input: {
                endAdornment: isFetching ? (
                  <CircularProgress size={20} />
                ) : (
                  internalSearch && (
                    <IconButton
                      onClick={() => {
                        setInternalSearch("");
                        setSearch("");
                      }}
                      edge="end"
                      size="small"
                    >
                      <ClearIcon />
                    </IconButton>
                  )
                ),
              },
            }}
          />

          <RandomButton />
        </Toolbar>
      </AppBar>

      <Container
        // sx={{ display: "flex", flexDirection: "column", gap: 2, py: 2 }}
        className="flex flex-col gap-4 py-4"
      >
        <Grid container spacing={2}>
          {list.map((item) => (
            <Grid
              key={item.id}
              item
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
            >
              <Badge
                badgeContent={item.in_favorites}
                color="primary"
                max={NaN}
                sx={{
                  // height: "100%",
                  "& .MuiBadge-badge": {
                    transform: "translate(-25%, +25%)",
                  },
                }}
                className="h-full"
              >
                <Card className="h-full">
                  <StatusChip
                    label={item.status.string}
                    status={item.status.code}
                  />
                  <CardActionArea
                    onClick={() => navigate(`/anime/${item.id}`)}
                    className="h-full"
                  >
                    <CardMedia
                      component="img"
                      image={`${WEB_URL}${item.posters.small.url}`}
                      sx={{
                        objectFit: "contain",
                      }}
                    />
                    <CardContent sx={{ height: "100%" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.names.ru}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {item.type.full_string}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Badge>
            </Grid>
          ))}
        </Grid>

        {((isFetching && isFetchingNextPage) || (!search && !isFetching)) && (
          <LoadingButton
            sx={{ alignSelf: "center" }}
            variant="contained"
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Загрузка..."
              : hasNextPage
                ? "Загрузить еще"
                : "Нечего грузить"}
          </LoadingButton>
        )}
      </Container>
    </Box>
  );
};
