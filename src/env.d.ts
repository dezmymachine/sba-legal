/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Sanity project for Knowledge posts. Unset → the build uses the sample posts. */
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
