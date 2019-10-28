

const G2Comps = require.context('@/components/g2', true, /\.vue$/);

export const getComponents = function() {
  return G2Comps.keys().map(v => G2Comps(v).default);
}
