import { Chip } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useState } from "react";

const prodUrl = "https://thechickentinder.com/party/";
const localUrl = "http://localhost:5173/party/";
const lanUrl = "http://192.168.0.27:5173/party/";

const isDev = process.env.NODE_ENV !== "production";

const baseUrl =
  isDev && window.location.hostname !== "localhost"
    ? lanUrl
    : isDev
    ? localUrl
    : prodUrl;

const ShareChip = ({ party, id }: { party: any; id: string }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: party?.name ?? "Chicken Tinder",
      text: baseUrl + id,
      url: baseUrl + id,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(baseUrl + id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        alert("Could not copy to clipboard. Please try manually.");
        console.error("Clipboard error:", error);
      }
    }
  };

  return (
    <Chip
      label={copied ? "Copied!" : "Share"}
      variant="outlined"
      clickable
      icon={<ShareOutlinedIcon sx={{ fontSize: 16 }} />}
      onClick={handleShare}
    />
  );
};

export default ShareChip;
