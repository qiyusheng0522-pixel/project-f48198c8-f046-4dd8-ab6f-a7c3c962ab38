import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  title: string;
  onBack: () => void;
  right?: ReactNode;
  children: ReactNode;
  variant?: "default" | "primary" | "cool" | "warm";
}

const SubPage = ({ title, onBack, right, children, variant = "default" }: Props) => {
  const headerClass =
    variant === "primary"
      ? "bg-gradient-primary text-primary-foreground"
      : variant === "cool"
      ? "bg-gradient-cool text-primary-foreground"
      : variant === "warm"
      ? "bg-gradient-warm text-primary-foreground"
      : "bg-card text-foreground border-b border-border";
  return (
    <div className="flex flex-col h-full">
      <header className={`px-3 pt-3 pb-3 flex items-center gap-2 ${headerClass}`}>
        <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-base font-bold">{title}</h1>
        {right}
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
    </div>
  );
};

export default SubPage;