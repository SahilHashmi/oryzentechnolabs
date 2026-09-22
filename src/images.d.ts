interface ResponsiveImage {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
}

declare module "*?card" {
  const image: ResponsiveImage;
  export default image;
}

declare module "*?logo" {
  const image: ResponsiveImage;
  export default image;
}

declare module "*?hero" {
  const image: ResponsiveImage;
  export default image;
}
