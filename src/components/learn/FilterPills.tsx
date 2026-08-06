import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FilterPillsProps {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}

const FilterPills = ({ label, options, selected, onSelect }: FilterPillsProps) => {
  if (!options.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        <Button
          key="all"
          variant={selected ? "outline" : "secondary"}
          size="sm"
          onClick={() => onSelect(null)}
        >
          All
        </Button>
        {options.map((option) => (
          <Button
            key={option}
            variant={selected === option ? "secondary" : "outline"}
            size="sm"
            onClick={() => onSelect(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterPills;
