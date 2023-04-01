import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>HOME PAGE</h1>
      <Link href={"/auth/sign-in"}>Login</Link>
      <Link href={"/auth/sign-up"}>Cadastro</Link>
      <Link href={"/app"}>App</Link>
      <Link href={"/app/offerings"}>Ofertas de Cursos</Link>
    </>
  );
}
