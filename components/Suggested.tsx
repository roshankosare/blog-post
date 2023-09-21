import Card from "./ui/Card";

interface SuggestedProps {}

const Suggested: React.FC<SuggestedProps> = ({}) => {
  return (
    <Card className="flex flex-col h-[400px] w-full">
      <p className="font-semibold text-center">Suggested Articles</p>
    </Card>
  );
};

export default Suggested;
