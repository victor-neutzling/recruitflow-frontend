import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="h2">page not found</Typography>
      <Typography variant="h2"></Typography>
      <Button size={"lg"} onClick={() => navigate("/")}>
        return to homepage
      </Button>
    </div>
  );
}
