import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ILoginInputs } from "@/utils/interface/login_interface";
import React from "react";
import { UseFormRegister } from "react-hook-form";

function PasswordLocal({
    register,
}: {
    register: UseFormRegister<ILoginInputs>;
}) {
    return (
        <div>
            <Label>Password</Label>
            <Input
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
            />
        </div>
    );
}

export default PasswordLocal;
