const styles = new Map();

const loadStyle = (url) => {
  if (styles.has(url)) {
    return styles.get(url);
  }

  const stylePromise = new Promise((resovle) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.addEventListener('load', () => {
      resovle();
    });
    document.head.append(link);
  });
  styles.set(url, stylePromise);

  return stylePromise;
};

export default loadStyle;
