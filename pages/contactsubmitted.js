import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Contact2 from '../components/contact/contactsection2';

export default function Contact() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Umami Recipe | Contact Us</title>
        <meta name='description' content='Umami Recipe | Contact Us' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        ></link>
      </Head>

      <div className='top-set'>
        <Contact2 />
      </div>
    </div>
  );
}
