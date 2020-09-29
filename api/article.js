import { request } from '@/plugins/request';
export const getArticles = (params) => {
  return request({ method: 'GET', url: '/articles', params });
};
export const getYourFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/articles/feed',
    params,
  });
};
export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `/articles/${slug}/favorite`,
  });
};
export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `/articles/${slug}/favorite`,
  });
};
export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/articles/${slug}`,
  });
};
export const addArticle = (data) => {
  return request({
    method: 'POST',
    url: `/articles`,
    data
  });
};
export const editArticle = (params) => {
  const { slug, ...data } = params
  return request({
    method: 'PUT',
    url: `/articles/${slug}`,
    data
  });
};
export const deleteArticle = (slug) => {
  return request({
    method: 'DELETE',
    url: `/articles/${slug}`,
  });
};
export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/articles/${slug}/comments`,
  });
};
export const addComments = (params) => {
  const { slug, comment } = params;
  return request({
    method: 'POST',
    url: `/articles/${params.slug}/comments`,
    data: { comment },
  });
};
export const deleteComments = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/articles/${slug}/comments/${id}`,
  });
};
export const deleteFollow = (username) => {
  return request({
    method: 'DELETE',
    url: `/profiles/${username}/follow`,
  });
};
export const addFollow = (username) => {
  return request({
    method: 'POST',
    url: `/profiles/${username}/follow`,
  });
};
