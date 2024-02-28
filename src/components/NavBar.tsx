import { HomeIcon } from "lucide-react";
import { FloatingNav } from "./ui/floating-navbar";

export default function NavBar() {
  return (
    <div>
      <FloatingNav
        className="mt-0"
        navItems={[
          {
            name: "Home",
            link: "/",
            icon: <HomeIcon />,
          },
        ]}
      />
    </div>
  );
}
