import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <ul>
        <li><Link href={"/products"}>Products Page</Link></li>
      </ul>
    </>
  );
}
