/* Public-policy Mux intro/story videos for each therapist, shown front and
   centre on their profiles (home "Meet" cards + About bios). Aspect ratio is
   stored so the modal can size correctly for portrait or landscape. */

export interface TherapistStory {
  playbackId: string;
  aspectW: number;
  aspectH: number;
}

export const therapistStories: Record<"Esther" | "Laura", TherapistStory | null> = {
  Esther: {
    playbackId: "02UONiUB9fF719AlIusHoejCgMIiJPuLdaOGJWTbZwqQ",
    aspectW: 16,
    aspectH: 9,
  },
  Laura: {
    playbackId: "ECJwSsBMm867zigBR9awOu01BAd8vjoaKJ773CPHN400k",
    aspectW: 16,
    aspectH: 9,
  },
};
