import { Audio } from "expo-av";
import { useEffect, useState } from "react";

export function useAyatAudio() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingAyat, setPlayingAyat] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  async function playAyat(
    audioUrl: string,
    ayatNumber: number,
    onFinish?: () => void,
  ) {
    // toggle pause
    if (playingAyat === ayatNumber && sound) {
      await sound.unloadAsync();
      setSound(null);
      setPlayingAyat(null);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    if (sound) await sound.unloadAsync();

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audioUrl },
      { shouldPlay: true },
    );

    setSound(newSound);
    setPlayingAyat(ayatNumber);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;

      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);

      if (status.durationMillis) {
        setProgress(status.positionMillis / status.durationMillis);
      }

      if (status.didJustFinish) {
        newSound.unloadAsync();
        setSound(null);
        setPlayingAyat(null);
        setProgress(0);
        setCurrentTime(0);
        setDuration(0);
        onFinish?.();
      }
    });
  }

  return {
    playAyat,
    playingAyat,
    progress,
    currentTime,
    duration,
  };
}
