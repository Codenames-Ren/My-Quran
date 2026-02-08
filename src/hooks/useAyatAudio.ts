import { Audio } from "expo-av";
import { useEffect, useState } from "react";

export function useAyatAudio() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingAyat, setPlayingAyat] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function setupAudio() {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    }
    setupAudio();

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  async function playAyat(
    audioUrl: string,
    ayatNumber: number,
    onFinish?: () => void,
  ) {
    if (playingAyat === ayatNumber && sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          // Pause
          await sound.pauseAsync();
          setIsPaused(true);
        } else {
          // Resume
          await sound.playAsync();
          setIsPaused(false);
        }
      }
      return;
    }

    // Stop previous audio
    if (sound) await sound.unloadAsync();

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audioUrl },
      { shouldPlay: true },
    );

    setSound(newSound);
    setPlayingAyat(ayatNumber);
    setIsPaused(false);

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
        setIsPaused(false);
        onFinish?.();
      }
    });
  }

  // Stop audio (for full audio)
  async function stopAudio() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setPlayingAyat(null);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      setIsPaused(false);
    }
  }

  // Stop simple
  async function stopAyatAudio() {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setPlayingAyat(null);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      setIsPaused(false);
    }
  }

  // Seek to some position
  async function seekTo(seconds: number) {
    if (sound) {
      await sound.setPositionAsync(seconds * 1000);
    }
  }

  return {
    playAyat,
    stopAudio,
    stopAyatAudio,
    seekTo,
    playingAyat,
    progress,
    currentTime,
    duration,
    isPaused,
  };
}
