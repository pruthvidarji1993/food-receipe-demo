import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Recipedetail1 from '../components/recipe_details/recipedetails1';
import Recipedetail2 from '../components/recipe_details/recipedetails2';
import Recipedetail3 from '../components/recipe_details/recipedetails3';
import Recipedetail4 from '../components/recipe_details/recipedetails4';
import Recipedetail5 from '../components/recipe_details/recipedetails5';
import Recipedetail6 from '../components/recipe_details/recipedetails6';
import {
  getRecipeDetail,
  getRecipeRatingsStats,
  getRecipeComments,
} from '../redux/actions/apiActions/apiAction';
import { toast } from 'react-toastify';
import Loader from '../ui/loadercustom';
export default function Recipedetail(props) {
  const router = useRouter();
  const [recipeDetail, setRecipeDetail] = useState('');
  const [starData, setStarData] = useState('');
  const [commentData, setCommentData] = useState('');

  useEffect(async () => {
    if (!router.isReady) return;
    let rId = router.query.id; // recipe ID
    if (rId !== undefined) {
      //recipe data
      let res = await getRecipeDetail(rId);
      if (res && res.status === 200) {
        setRecipeDetail(res.data.data.recipeData);
      } else {
        toast.error('Recipe not found');
        router.push('/');
      }
      //rating data
      let starData = await getRecipeRatingsStats(rId);
      if (starData && starData.status === 200) {
        let starArray = [
          { count: 0, rating: 1 },
          { count: 0, rating: 2 },
          { count: 0, rating: 3 },
          { count: 0, rating: 4 },
          { count: 0, rating: 5 },
        ];
        starData.data.data.map(
          (item, i) => (starArray[item.rating - 1] = item)
        );
        setStarData(starArray);
      } else {
        toast.error('Recipe not found');
        router.push('/');
      }

      //comment data
      let commentData = await getRecipeComments(rId);
      if (commentData && commentData.status === 200) {
        setCommentData(commentData.data.data.comments);
      } else {
        toast.error('Recipe not found');
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router.isReady, router.query.id]);

  const callback = async () => {
    let rId = router.query.id; // recipe ID
    if (rId !== undefined) {
      //comment data
      let commentData = await getRecipeComments(rId);
      if (commentData && commentData.status === 200) {
        setCommentData(commentData.data.data.comments);
      } else {
        toast.error('Recipe not found');
        router.push('/');
      }
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Umami Recipe | Recipe Detail</title>
        <meta name='description' content='Umami Recipe | Recipe Detail' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        ></link>
      </Head>

      {recipeDetail !== '' ? (
        <div className='top-set'>
          <Recipedetail1 recipeDetail={recipeDetail} starData={starData} />
          <Recipedetail2 recipeDetail={recipeDetail} />
          <Recipedetail3 recipeDetail={recipeDetail} />
          <Recipedetail4 recipeDetail={recipeDetail} starData={starData} />
          <Recipedetail5
            recipeDetail={recipeDetail}
            commentData={commentData}
            callback={callback}
          />
          <Recipedetail6 recipeDetail={recipeDetail} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
