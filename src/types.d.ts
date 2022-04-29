type CaptureMediaSource = {
  id: string;
  label: string;
  type: "screen" | "window" | "videoinput" | "audioinput" | "audiooutput";
  iconDataURL: string | null;
};
