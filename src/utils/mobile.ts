import MobileDetect from 'mobile-detect';

/**
 * 判斷裝置初始化，用這套件是因為可以針對多版本去下判斷
 * resource: https://github.com/hgoebl/mobile-detect.js
 */
export const md = new MobileDetect(navigator.userAgent);
/**
 * 判斷是否為手機板
 */
export const isMobile = !!md.phone();

/**
 * 裝置參數
 * 1: 代表web，2: 代表手機
 */
export const device = isMobile ? 2 : 1;
/**
 * 是否為蘋果
 */

