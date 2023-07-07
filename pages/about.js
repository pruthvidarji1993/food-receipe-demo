import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Structure1 from '../components/common/textStructure1';
import Structure2 from '../components/common/textStructure2';
import { getMasterData } from '../redux/actions/apiActions/apiAction';
import { toast } from 'react-toastify';

export default function Abouts() {
  const [masterData, setMasterData] = useState('');
  useEffect(async () => {
    let res = await getMasterData();
    if (res && res.status === 200) {
      setMasterData(res.data.data);
    } else {
      toast.error('Something went wrong');
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Umami Recipe | About Us</title>
        <meta name='description' content='Umami Recipe | About Us' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='top-set'>
        <section className='main-structure-section'>
          <Structure1 masterData={masterData} />
          <Structure2 masterData={masterData} page='aboutUs' />
        </section>
      </div>
    </div>
  );
}
