/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string
  readonly VITE_YM_ID: string
  readonly VITE_TG_BOT_LINK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}