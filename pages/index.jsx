import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>HOME PAGE</h1>
      <Link href={"/sign-in"}>Login</Link>
      <br />
      <Link href={"/sign-up"}>Cadastro</Link>
    </>
  );
}
