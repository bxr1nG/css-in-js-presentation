export type Anilibria = {
  list?: AnilibriaList[];
  pagination: Pagination;
};

export type AnilibriaList = {
  id: number;
  code: string;
  names: Names;
  franchises: FranchiseElement[];
  announce: null | string;
  status: Status;
  posters: Posters;
  updated: number | null;
  last_change: number;
  type: Type;
  genres: string[];
  team: Team;
  season: Season;
  description: string;
  in_favorites: number;
  blocked: Blocked;
  player: Player;
  torrents: Torrents;
};

export type Blocked = {
  copyrights: boolean;
  geoip: boolean;
  geoip_list: any[];
};

export type FranchiseElement = {
  franchise: FranchiseFranchise;
  releases: Release[];
};

export type FranchiseFranchise = {
  id: string;
  name: string;
};

export type Release = {
  id: number;
  code: string;
  ordinal: number;
  names: Names;
};

export type Names = {
  ru: string;
  en: string;
  alternative: null | string;
};

export type Player = {
  alternative_player: null | string;
  host: string;
  is_rutube: boolean;
  episodes: Episodes;
  list: { [key: string]: ListValue };
  rutube: Rutube;
};

export type Episodes = {
  first: number | null;
  last: number | null;
  string: String | null;
};

export enum String {
  The112 = "1-12",
  The113 = "1-13",
  The120 = "1-20",
}

export type ListValue = {
  episode: number;
  name: null | string;
  uuid: string;
  created_timestamp: number;
  preview: string;
  skips: Skips;
  hls: HLS;
};

export type HLS = {
  fhd: string;
  hd: string;
  sd: string;
};

export type Skips = {
  opening: number[];
  ending: any[];
};

export type Rutube = {};

export type Posters = {
  small: Medium;
  medium: Medium;
  original: Medium;
};

export type Medium = {
  url: string;
  raw_base64_file: null;
};

export type Season = {
  string: string;
  code: number;
  year: number;
  week_day: number;
};

export type Status = {
  string: string;
  code: 1 | 2 | 3 | 4;
};

export type Team = {
  voice: string[];
  translator: string[];
  editing: any[];
  decor: string[];
  timing: string[];
};

export type Torrents = {
  episodes: Episodes;
  list: TorrentsList[];
};

export type TorrentsList = {
  torrent_id: number;
  episodes: Episodes;
  quality: Quality;
  leechers: number;
  seeders: number;
  downloads: number;
  total_size: number;
  size_string: string;
  url: string;
  magnet: string;
  uploaded_timestamp: number;
  hash: string;
  metadata: Metadata | null;
  raw_base64_file: null | string;
};

export type Metadata = {
  hash: string;
  name: string;
  announce: string[];
  created_timestamp: number;
  files_list: FilesList[];
};

export type FilesList = {
  file: string;
  size: number;
  size_string: string;
  offset: number;
};

export type Quality = {
  string: string;
  type: string;
  resolution: string;
  encoder: string;
  lq_audio: null;
};

export type Type = {
  full_string: string;
  code: number;
  string: string;
  episodes: number | null;
  length: number | null;
};

export type Pagination = {
  pages: number;
  current_page: number;
  items_per_page: number;
  total_items: number;
};
