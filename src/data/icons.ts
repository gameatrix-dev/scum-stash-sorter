import { BookOpen, Drill, Hammer, Package, Scissors, Wrench } from "lucide-react";

export const iconFor = (slug: string) => {
  switch (slug) {
    case "gwozdzie":
      return Hammer;
    case "sruby":
      return Wrench;
    case "wiertarki":
      return Drill;
    case "przecinarki":
      return Scissors;
    case "pamietniki":
      return BookOpen;
    default:
      return Package;
  }
};
