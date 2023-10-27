import Card from "./ui/Card";

interface NewSuggetionsProps {}

const NewSuggetions: React.FC<NewSuggetionsProps> = ({}) => {
  return (
    <Card className="flex flex-col h-[400px] w-full">
      <p className="font-bold text-gray-600">Recently Added Articles</p>
    </Card>
  );
};

export default NewSuggetions;
