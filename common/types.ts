export interface Note {
  title: string;
  path: string;
  createTime?: string;
  updateTime?: string;
  tags?: string[];
  img?: string;
}

export interface ContentNavigate {
  id: string;
  title: string;
  level: number;
}
