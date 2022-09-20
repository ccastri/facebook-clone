import Head from 'next/head'
import { getSession } from 'next-auth/react'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Header } from '../components/Header'
import Login from '../components/Login'
import { Sidebar } from '../components/Sidebar'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets'

export default function Home({ session }) {
  if (!session) return <Login />
  return (
    <div className={styles.container}>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <Feed />
        <Widgets />
        {/* SideBar */}
        {/* Feed */}
        {/* Widgets */}
      </main>

    </div>
  )
}


export async function getServerSideProps(context) {
  // Get User
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}