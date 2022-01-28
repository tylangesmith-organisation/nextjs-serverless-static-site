import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

const Other: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Static Site Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container px-2 h-screen flex flex-col justify-center items-center prose mx-auto">
        <h1 className="text-5xl font-black">
          Other Page
        </h1>
        <p className="text-2xl text-center">
          This is an example Next.js static site for the blog<br /><a className="text-blue-600" href="https://tylangesmith.com/blog/building-a-nextjs-serverless-static-site-using-aws-cdk">Building a Next.js Serverless Static Site using AWS CDK</a>
        </p>
        <Link href="/">
          <a className="text-2xl">
            Home Page
          </a>
        </Link>
      </main>
    </div>
  )
}

export default Other
