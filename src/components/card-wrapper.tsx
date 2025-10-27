"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="flex flex-col justify-center items-center text-center">
        <CardTitle className="text-3xl font-bold text-black">Auth</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {headerLabel}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardContent className="flex justify-between items-center gap-x-2 ">
          <Button
            variant="outline"
            size="lg"
            className="flex flex-grow justify-center items-center"
          >
            <FcGoogle className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex flex-grow justify-center items-center"
          >
            <FaGithub className="size-4" />
          </Button>
        </CardContent>
      )}

      <CardFooter className="flex items-center justify-center">
        <Link href={backButtonHref}>{backButtonLabel} </Link>
      </CardFooter>
    </Card>
  );
};
