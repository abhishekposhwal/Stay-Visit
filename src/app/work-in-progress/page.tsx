
import { Button } from "@/components/ui/button";
import { HardHat } from "lucide-react";
import Link from "next/link";

export default function WorkInProgressPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 py-32">
      <HardHat className="h-16 w-16 text-accent mb-4" />
      <h1 className="text-xl md:text-2xl font-bold mb-2">Work in Progress</h1>
      <p className="text-sm text-muted-foreground mb-6">
        This feature is currently under construction. Please check back later!
      </p>
      <Button asChild>
        <Link href="/">Go back to Home</Link>
      </Button>
    </div>
  );
}
