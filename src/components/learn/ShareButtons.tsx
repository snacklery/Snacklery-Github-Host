import { Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShareButtons = ({ path, title }: { path: string; title: string }) => {
  const shareUrl = `${window.location.origin}${path}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title, url: shareUrl });
    } else {
      await copyLink();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={share}>
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
      <Button variant="ghost" size="sm" onClick={copyLink}>
        <Copy className="mr-2 h-4 w-4" />
        Copy link
      </Button>
    </div>
  );
};

export default ShareButtons;
