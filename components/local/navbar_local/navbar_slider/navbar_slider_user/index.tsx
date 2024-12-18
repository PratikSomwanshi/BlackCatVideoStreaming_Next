import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Crown, LogOut, UserRound } from "lucide-react";
import React from "react";

function NavbarSliderUser() {
    return (
        <div className="space-y-3">
            <div className="flex justify-end">
                <Avatar>
                    <AvatarFallback>
                        {/* <AvatarImage src="./avatar-80-07.jpg" alt="Kelly King" /> */}
                        <UserRound
                            size={20}
                            strokeWidth={2}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div>
                <h2>User Name</h2>
            </div>
            <div>
                <Button className="flex justify-center items-center">
                    <Crown
                        className="-ms-1 me-2 mb-[0.10rem] opacity-60"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                    Be Premium User
                </Button>
            </div>
            <div>
                <Button className="flex justify-center items-center w-full">
                    <LogOut
                        className="-ms-1 me-2 mb-[0.10rem] opacity-60"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}

export default NavbarSliderUser;

// Dependencies: pnpm install lucide-react

// import { Button } from "@/components/ui/button";
// import { Archive } from "lucide-react";

// export default function ButtonDemo() {
//   return (
//     <Button>
//       <Archive className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
//       Button
//     </Button>
//   );
// }
