export const THEME_KEY = "cb-theme";

/** Sets data-theme before first paint: saved choice, else the system preference. */
const script = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");}catch(e){}if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.dataset.theme=t;})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
