export type FilmCardType = {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
    isActive: string;
    onMouseEnter?: (filmId: string) => void;
    onMouseLeave?: () => void;
}
