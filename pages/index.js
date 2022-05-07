import Head from "next/head";
import { Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>CrCl & Vanco Calc</title>
        <meta name="description" content="CrCl & Vanco Calc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading>calc</Heading>
    </div>
  );
}
