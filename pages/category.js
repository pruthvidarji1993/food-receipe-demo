import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Category1 from '../components/category/categorysection1';
import Category2 from '../components/category/categorysection2';

export default function Category() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Umami Recipe | Category</title>
        <meta name='description' content='Umami Recipe | Category' />
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
        <Category1 />
        {/* <Category2 /> */}
      </div>
    </div>
  );
}
