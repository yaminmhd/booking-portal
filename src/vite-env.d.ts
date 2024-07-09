/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_STORAGE_KEY: string;
  readonly VITE_USE_AUTH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
