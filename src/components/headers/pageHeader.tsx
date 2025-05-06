"use client";
import Head from "next/head";

interface HeadTagProps {
  heading: string;
}

const HeadTag: React.FC<HeadTagProps> = ({ heading }) => {
  console.log(heading);

  return (
    <Head>
      <title>{heading}</title>
    </Head>
  );
};

export default HeadTag;
