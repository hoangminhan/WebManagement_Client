export default function formatNumber(x) {
  if (x && x !== 'null' && x !== 'undefined') {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0
  }
}