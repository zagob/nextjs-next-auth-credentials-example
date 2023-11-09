import { SignOut } from "@/components/signOut";
import { apiFetch } from "../lib/api";

export default async function Dashboard() {
  const itens = await apiFetch("/lateral/getItensRecentes", "GET");

  console.log("itens", itens);
  return (
    <div>
      <h1>Dash</h1>
      <SignOut />
    </div>
  );
}
