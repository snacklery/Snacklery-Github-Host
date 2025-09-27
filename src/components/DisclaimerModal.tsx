import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DisclaimerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DisclaimerModal = ({ open, onOpenChange }: DisclaimerModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Disclaimer</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-foreground text-base leading-relaxed">
          This calculator uses data compiled from PlasticsEurope Eco-profiles, NatureWorks Ingeo PLA eco-profiles, EXIBA/PlasticsEurope polystyrene eco-profiles, the Aspenware wooden cutlery ISO LCA, the UNEP 'Single-use plastic tableware and its alternatives' meta-analysis, and the FRENVI EATlery website; figures are synthesized by Perplexity AI as of 16 Sep 2025 and provided for indicative use only.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default DisclaimerModal;