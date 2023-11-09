import { Login } from "@/components/login";
import { getSession } from "@/utils/authOptions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  console.log("sss", session);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      Home
      <Login />
    </div>
  );
}
