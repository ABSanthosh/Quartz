export default function md5(len = 10) {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
