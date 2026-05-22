import PhdApplicationProcess, {
  meta as phdApplicationMeta,
} from '../posts/phd-application-process';

// To add a new post:
// 1. Create src/posts/your-slug.js exporting `meta` + a default component
// 2. Import it here and add an entry below
const posts = [
  { ...phdApplicationMeta, Component: PhdApplicationProcess },
];

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug);

export default posts;
