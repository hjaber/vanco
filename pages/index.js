import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import Home from "@/components/home";

export default function Index() {
  return (
    <>
      <Head>
        <title>CrCl & Vanco Calc</title>
        <meta name="description" content="CrCl & Vanco Calc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" gap="1em" p={6}>
        <Home />
      </Flex>
    </>
  );
}
