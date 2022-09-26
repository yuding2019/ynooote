import { useRouter } from "next/router";

import { useProgress } from "../../hooks/useProgress";

import styles from "./index.module.less";

const Toolbar = () => {
  const router = useRouter();

  const progress = useProgress();

  const handleBack = () => {
    router.replace("/");
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.tool} ref={progress} onClick={handleBack}>
        <img
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgY2xhc3M9ImZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLWxlZnQiIGZpbGw9Im5vbmUiIGhlaWdodD0iMjQiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTggOSAxMiAxNSA2Ii8+PC9zdmc+"
          alt=""
        />
      </div>
    </div>
  );
};

export default Toolbar;
