export interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {};
}

export type Token = {
  image: string;
  name: string;
  progress: number;
  link: string;
};