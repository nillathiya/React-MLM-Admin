// Env constants
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const CRYPTO_SECRET_KEY = import.meta.env.VITE_APP_CRYPTO_SECRET_KEY;
export const USER_API_URL = import.meta.env.VITE_USER_API_URL;

// Pagination
export const DEFAULT_ITEMS_PER_PAGE = 10;
export const DEFAULT_CURRENT_PAGE = 0;
export const DEFAULT_PER_PAGE_ITEMS = 10;

export const INCOME_FIELDS = {
  roi: 'Daily Stake Reward',
  direct: 'Stake Sponsor Reward',
  referral: 'Team Performance Reward',
  reward: 'Reward',
  royalty: 'Team Development Reward',
};
