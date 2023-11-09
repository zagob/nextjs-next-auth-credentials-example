import { getSession } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }
  return <div>{children}</div>;
}
