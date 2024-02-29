export type Coordinates = {
    lat: number;
    lng: number;
}
export type Post = {
  comment: string;
  likes: number;
  lat: number;
  lng: number;
  id: string;
  user_id: string;
}
export interface LoginProp {
  getLoginId: () => void
}
export interface EditProps extends LoginProp {
  decodedToken: null | string;
}
export interface Props extends EditProps {
  giveCoords: () => void;
  coords: Coordinates;
}
export interface AddCommentProps{
  getPosts: ()=> void;
  toggleModal: ()=> void;
  decodedToken: string
  coords: Coordinates;
}
