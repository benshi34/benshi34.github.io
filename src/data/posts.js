import PhdApplicationProcess, {
  meta as phdApplicationMeta,
} from '../posts/phd-application-process';
import ImpersonaEnv, { meta as impersonaEnvMeta } from '../posts/impersona-env';

// To add a new post:
// 1. Create src/posts/your-slug.js exporting `meta` + a default component
// 2. Import it here and add an entry below
const posts = [
  { ...impersonaEnvMeta, Component: ImpersonaEnv },
  { ...phdApplicationMeta, Component: PhdApplicationProcess },
];

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug);

export default posts;
