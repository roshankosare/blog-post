import { Loader2 } from "lucide-react";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {message}
    </>
  );
};

export default Loader;
