/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CIVIC_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
