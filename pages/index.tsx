import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Footer from '../components/footer'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen break-words">
      <Head>
        <title>Static Site Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className="container px-2 flex-grow flex flex-col justify-center items-center prose mx-auto">
          <h1 className="text-5xl font-black">
            Home Page
          </h1>
          <p className="text-2xl text-center">
            This is an example Next.js static site for the blog<br /><a className="text-blue-600" href="https://tylangesmith.com/blog/building-a-nextjs-serverless-static-site-using-aws-cdk">Building a Next.js Serverless Static Site using AWS CDK</a>
          </p>
          <Link href="/other">
            <a className="text-2xl">
              Other Page
            </a>
          </Link>
        </main>
        <Footer />
    </div>
  )
}

export default Home
