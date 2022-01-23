import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Style.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Static Site Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Home Page
        </h1>
        <p className={styles.paragraph}>
          This is an example Next.js static site for the blog <br /><a href="https://tylangesmith.com/blog/building-a-nextjs-serverless-static-site-using-aws-cdk">Building a Next.js Serverless Static Site using AWS CDK</a>
        </p>
        <Link href="/other">
          <a className={styles.card}>
            Other Page
          </a>
        </Link>
      </main>
    </div>
  )
}

export default Home
