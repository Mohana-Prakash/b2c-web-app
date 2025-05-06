const FAQ = "/faq";
const PROFILE = "/profile";
const TUTORIAL_VIDEOS = "/video-info";
export const API_ENDPOINTS = {
  // Dashboard

  // User List

  // Hedera Summary

  // Payment Summary

  // Co2 calculator

  // Leaderboard

  // Badges and Ranks

  // FAQs
  UPDATE_FAQ: (id: number): string => `${FAQ}/update/${id}`,
  UPDATE_FAQ_STATUS: (id: string): string => `${FAQ}/update-status/${id}`,
  CREATE_FAQ: `${FAQ}/create`,
  GET_FAQ_LIST_BY_STATUS: (page: number, size: number, status: string, category: string): string =>
    `${FAQ}/get-faq-list-by-status?pageNo=${page}&pageSize=${size}&status=${status}&category=${category}`,

  // Tutorial Videos
  UPDATE_VIDEO: (id: number): string => `${TUTORIAL_VIDEOS}/update/${id}`,
  CREATE_VIDEO: `${TUTORIAL_VIDEOS}/create`,
  GET_VIDEO_LIST_BY_STATUS: (page: number, size: number, status: string): string =>
    `${TUTORIAL_VIDEOS}/get-video-info-list-status?pageNo=${page}&pageSize=${size}&status=${status}`,
  // Customer Support

  // Profile Settings
  GET_PROFILE_INFO: `${PROFILE}/get-profile-info`,
  UPDATE_PROFILE: `${PROFILE}/update`,
};
