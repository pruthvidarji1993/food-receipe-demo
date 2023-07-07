import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Home1 from '../components/home/homesection1';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Umami Recipe | Home</title>
        <meta name='robots' content='noindex' />
        <meta name='description' content='Umami Recipe | Home' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          type='text/css'
          charset='UTF-8'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
        <link
          rel='stylesheet'
          href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        ></link>
      </Head>

      <div className='top-set'>
        <Home1 />
      </div>
    </div>
  );
}
