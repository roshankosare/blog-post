import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface TooltipMarkdownToolProps {
  children: ReactNode;
  tipText: string;
}

const TooltipMarkdownTool: React.FC<TooltipMarkdownToolProps> = ({
  children,
  tipText,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default TooltipMarkdownTool;
