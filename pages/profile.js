import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Profile from '../components/profile/profilesection1';

export default function Profiles() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Umami Recipe | Profile</title>
        <meta name='description' content='Umami Recipe | Profile' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='top-set'>
        <Profile />
      </div>
    </div>
  );
}
