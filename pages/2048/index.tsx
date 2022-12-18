import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";

import { GAME_BOARD_ID, GAME_SIZE } from "./constant";

import styles from "./index.module.less";
import { GameSize, GameModel } from "./model";
import { isPC } from "../../common/util";

const Game2048 = () => {
  const router = useRouter();

  const gameRef = useRef<GameModel>(new GameModel());

  const [size, setSize] = useState<GameSize>(GAME_SIZE.FOUR);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    gameRef.current.onGameOver(() => {
      setIsGameOver(true);
    });
  }, []);

  useEffect(() => {
    if (isPC()) {
      gameRef.current.init(size);
    }

    return () => {
      gameRef.current.clear();
    };
  }, [size]);

  const handleRestart = () => {
    setIsGameOver(false);
    gameRef.current.init();
  };

  const handleSizeSelect = (_size: GameSize) => {
    setSize(_size);
  };

  const handleBack = () => {
    router.replace("/");
  };

  const controlRender = () => {
    return null;
    // return (
    //   <div className={styles.control}>
    //     <div className={styles.buttons}>
    //       {Object.values(GAME_SIZE).map((_size, index) => {
    //         return (
    //           <div
    //             key={index}
    //             className={classNames(styles.btn, {
    //               [styles.btnActive]: size[0] === _size[0],
    //             })}
    //             onClick={() => handleSizeSelect(_size)}
    //           >
    //             {_size[0]} X {_size[1]}
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // );
  };

  const gameRender = () => {
    if (!isPC()) {
      return <div className="body">暂时只支持在PC端访问</div>;
    }

    const rows = Array.from({ length: size[0] });
    const cols = Array.from({ length: size[1] });

    return (
      <div className={styles.background}>
        <div
          className={classNames(styles.gameOver, {
            [styles.gameOverShow]: isGameOver,
          })}
        >
          <span>Game Over</span>
          <div className={styles.restart} onClick={handleRestart}>
            再来一次
          </div>
        </div>
        <div id={GAME_BOARD_ID} />
        {rows.map((row, rowIndex) => {
          return (
            <div className={styles.bgRow} key={rowIndex}>
              {cols.map((col, colIndex) => (
                <div className={styles.bgCol} key={colIndex} />
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {controlRender()}
        {gameRender()}
        <div className={styles.back} onClick={handleBack}>
          返回列表
        </div>
      </div>
    </div>
  );
};

export default Game2048;
