/**
 * The signed-in person, as the rest of the app sees them, whichever auth provider is in use.
 */
export type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
};
