import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Stories from '../components/Stories'

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll bg-gray-50 scrollbar-hide">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Feed/>
    </div>
  )
}
