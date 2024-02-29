export type Coordinates = {
    lat: number;
    lng: number;
}
export type LoginProp = {
  getLoginId: () => void
}

export interface Props {
  getLoginId: () => void;
  giveCoords: () => void;
  decodedToken: null | string;
  coords: Coordinates;
}

export interface Post {
  comment: string;
  likes: number;
  lat: number;
  lng: number;
  id: string;
  user_id: string;
}



export interface AddCommentProps {
  getPosts: ()=> void;
  toggleModal: ()=> void;
  decodedToken: string
  coords: Coordinates;
}
