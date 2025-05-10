import { Switch } from "./switch";
import useDarkMode from "../../hooks/useDarkMode";

export default function ToggleDarkMode() {
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  return (
    <>
        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
    </>
  );
}