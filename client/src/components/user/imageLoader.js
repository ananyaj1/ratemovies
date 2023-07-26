const context = require.context('../../../public/propics', false, /\.(png|jpe?g|svg)$/);

const imageLoader = () => {
  const images = {};
  context.keys().forEach((key) => {
    images[key] = context(key);
  });
  return images;
};

export default imageLoader;