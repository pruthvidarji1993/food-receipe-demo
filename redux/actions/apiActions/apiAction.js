import { api } from '../../../api/api';
import { toast } from 'react-toastify';

// Home page api
export const getHomePageData = async (
  search = '',
  categoryFilter = '',
  sortList = 'latestToOldest',
  page = 1,
  limit = 10
) => {
  const data = {
    search,
    categoryFilter,
    sortList,
    page,
    limit,
  };
  let res;
  res = await api(
    `v1/homePageListing?categoryId=${data.categoryFilter}&sortList=${data.sortList}&search=${data.search}&page=${data.page}&limit=${data.limit}`,
    {},
    'get'
  );
  return res;
};

//get master data
export const getMasterData = async () => await api('v1/banner', {}, 'get');

//get recipe detail
export const getRecipeDetail = async (id) =>
  await api(`v1/recipe/one/${id}`, {}, 'get');

//get top recipe details
export const getTopRecipeDetail = async () =>
  await api(`v1/review/topReviewedRecipes?limit=5`, {}, 'get');

//get recipe rating star detail
export const getRecipeRatingsStats = async (id) =>
  await api(`v1/review/getRecipeRatingsStats/${id}`, {}, 'get');

//get recipe comments detail
export const getRecipeComments = async (id) =>
  await api(`v1/review/getRecipeComments/${id}`, {}, 'get');

//add/remove bookmark api
export const addRemoveBookMark = async (id) =>
  await api(`v1/recipe/addRemoveBookMark/${id}`, {}, 'post');

//get bookmared recipe data
export const getAllBookMarked = async (sortList, categoryId, page) => {
  let res;
  console.log('page', page);
  if (categoryId !== '') {
    res = await api(
      `v1/recipe/getAllBookMarked?sortList=${sortList}&categoryId=${categoryId}&page=${page}&limit=10`,
      {},
      'get'
    );
  } else {
    res = await api(
      `v1/recipe/getAllBookMarked?sortList=${sortList}&page=${page}&limit=10`,
      {},
      'get'
    );
  }
  return res;
};

//comments markAsHelpFulOrNot api
export const markAsHelpFulOrNot = async (data) =>
  await api(`v1/review/markAsHelpFulOrNot/${data.id}`, data, 'post');

//submit review api
export const submitReview = async (data) =>
  await api(`v1/review/create`, data, 'post');

//get all notification list
export const getAllNotification = async (userId) =>
  await api(`v1/notification/all?userId=${userId}`, {}, 'get');

//delete notification
export const deleteNotification = async (data) =>
  await api(`v1/notification/delete`, data, 'post');

//read notification
export const readNotification = async (data) =>
  await api(
    `v1/notification/update/${data.id}?userId=${data.userId}`,
    data,
    'get'
  );

//get new notification liston timestamp base
export const getNewNotification = async (data) =>
  await api(`v1/notification/getNew`, data, 'post');

//contact us api
export const contactUs = async (data) =>
  await api(`v1/inquiry/create`, data, 'post');

//image upload in base64 and get url api
export const getImageUrlFromBase64 = async (data) =>
  await api(`v1/file`, data, 'post');

//delete image
export const deleteImage = async (data) =>
  await api(`v1/file/delete`, data, 'post');

//suggestion list api
export const suggestionApi = async (data) =>
  await api(
    `v1/search?search=${data.search}&page=1&limit=10&categoryId=${data.categoryId}`,
    {},
    'get'
  );
