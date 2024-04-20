import Image from "next/image";
import AddRecipeButton from "./components/AddRecipeButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <AddRecipeButton />
    </main>
  );
}
