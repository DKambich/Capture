type DesktopMediaSource = {
  id: string;
  display_id: string;
  type: "screen" | "window";
  name: string;
  iconDataURL: string | null;
  thumbnailDataURL: string;
};

type CaptureMediaSource = {
  id: string;
  label: string;
  type: "screen" | "window" | "videoinput" | "audioinput" | "audiooutput";
  iconDataURL: string | null;
};
