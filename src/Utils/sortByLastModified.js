export function sortByLastModified(array) {
  //   sort array by lastModified.seconds which has the value of Date.now()
  return array.sort((a, b) => {
    return b.lastModified.seconds - a.lastModified.seconds;
  });
}
