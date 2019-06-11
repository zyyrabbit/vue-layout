export const importSvgIcons = (requireContext: any) =>
  requireContext.keys().map(requireContext);
export const svgs = require.context('@/assets/svg', true, /\.svg$/);

export default {
  svgs,
  importSvgIcons,
};
