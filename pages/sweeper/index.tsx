import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { SweeperCell, SweeperModel } from "./model";

import mine from "./images/mine.png";
import flag from "./images/flag.png";
import question from "./images/question.png";

import styles from "./index.module.less";
import { getIndex, updateTime } from "./util";
import classNames from "classnames";
import {
  SWEEPER_FLAG_STATUS,
  SweeperLevel,
  CONTROL_LEVEL_BUTTONS,
  TIP_SVG_BASE_64,
} from "./constant";
import { isNil } from "lodash";

const CELL_WIDTH = 30;
const LEFT_MOUSE_KEY = 0;

const MINE_SRC = mine.src;
const FLAG_SRC = flag.src;
const QUESTION_SRC = question.src;

const STATUS_TO_SRC = {
  [SWEEPER_FLAG_STATUS.MINE]: FLAG_SRC,
  [SWEEPER_FLAG_STATUS.QUESTION]: QUESTION_SRC,
};

const Sweeper = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cancelUpdateTimeRef = useRef(() => {});

  const [level, setLevel] = useState(SweeperLevel.EASY);
  const [tipIndexes, setTipIndexes] = useState<number[]>([]);
  const sweeperModelRef = useRef(new SweeperModel(level));

  const router = useRouter();

  const [_, update] = useState(0);

  // 监听右键点击
  useEffect(() => {
    containerRef.current.oncontextmenu = function (e) {
      e.preventDefault();
      if (sweeperModelRef.current.gameOver) {
        return;
      }

      if (sweeperModelRef.current.success) {
        cancelUpdateTimeRef.current();
        return;
      }

      const { x, y } = (e.target as HTMLDivElement).dataset;
      if (isNil(x) || isNil(y)) {
        return;
      }

      const index = getIndex(+x, +y, sweeperModelRef.current.size);
      const cell = sweeperModelRef.current.cells[index];
      if (cell.flag === SWEEPER_FLAG_STATUS.NOT_MINE) {
        sweeperModelRef.current.startFlagNotMine(cell);
        sweeperModelRef.current.isGameOver(cell.flagNotMine());
      } else {
        cell.flagCell();
      }
      update((prev) => ++prev);
    };
  }, []);

  // 左键点击
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: SweeperCell
  ) => {
    if (e.button !== LEFT_MOUSE_KEY) {
      return;
    }

    if (sweeperModelRef.current.gameOver || sweeperModelRef.current.success) {
      return;
    }

    if (!sweeperModelRef.current.isInitializedMine) {
      cancelUpdateTimeRef.current = updateTime();
      sweeperModelRef.current.initMines(cell.location);
    }

    sweeperModelRef.current.startFlagNotMine(cell);
    sweeperModelRef.current.isGameOver(cell.flagNotMine());

    // 停止计时
    if (sweeperModelRef.current.gameOver || sweeperModelRef.current.success) {
      cancelUpdateTimeRef.current();
    }
    update((prev) => ++prev);
  };

  const handleLevelChange = (_level: SweeperLevel) => {
    sweeperModelRef.current = new SweeperModel(_level);
    cancelUpdateTimeRef.current();
    setTipIndexes([]);
    setLevel(_level);
  };

  const handleRestart = () => {
    cancelUpdateTimeRef.current();

    if (!sweeperModelRef.current.isInitializedMine) {
      return;
    }

    sweeperModelRef.current = new SweeperModel(level);
    setTipIndexes([]);
    update((prev) => ++prev);
  };

  const handleBack = () => {
    router.replace("/");
  };

  const handleTip = () => {
    setTipIndexes(sweeperModelRef.current.getTip());
  };

  const [xTotal, yTotal] = sweeperModelRef.current.size;
  const gameOver = sweeperModelRef.current.gameOver;
  const gameSuccess = sweeperModelRef.current.success;

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.board}>
        <div className={styles.control}>
          <div className={styles.buttons}>
            {CONTROL_LEVEL_BUTTONS.map((btn) => {
              return (
                <div
                  key={btn.level}
                  className={classNames({
                    [styles.active]: level === btn.level,
                  })}
                  onClick={() => handleLevelChange(btn.level)}
                >
                  {btn.text}
                </div>
              );
            })}
          </div>
          <div className={styles.info}>
            <div>
              时间：<span id="sweeper-time">00:00:000</span>
            </div>
            <div className={styles.progress}>
              <span className={styles.text}>
                {sweeperModelRef.current.flagCount}/
                {sweeperModelRef.current.mineCount}
              </span>
              <span
                className={classNames(styles.inProgress, {
                  [styles.success]: gameSuccess,
                  [styles.fail]: gameOver,
                })}
                style={{
                  width: `${~~(
                    (sweeperModelRef.current.flagCount /
                      sweeperModelRef.current.mineCount) *
                    100
                  )}%`,
                }}
              />
            </div>
            <div className={styles.btnWrap}>
              <div
                className={classNames(styles.singleButton, {
                  [styles.success]: gameSuccess,
                  [styles.fail]: gameOver,
                })}
                onClick={handleRestart}
              >
                重新开始
              </div>
              <div className={styles.tipBtn} onClick={handleTip}>
                <img src={TIP_SVG_BASE_64} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.cellWrap}
          style={{
            width: xTotal * CELL_WIDTH + 20,
            height: yTotal * CELL_WIDTH + 20,
          }}
        >
          {sweeperModelRef.current.cells.map((cell, index) => {
            const { location } = cell;
            const isEnd = location.x + 1 === sweeperModelRef.current.size[0];
            return (
              <React.Fragment key={index}>
                <div
                  className={classNames(styles.cell, {
                    [styles.flag]: cell.flag === SWEEPER_FLAG_STATUS.NOT_MINE,
                    [styles.gameOver]:
                      cell.isMine &&
                      cell.flag !== SWEEPER_FLAG_STATUS.MINE &&
                      gameOver,
                    [styles.errorFlag]: cell.isError,
                    [styles.flash]:
                      !cell.flag && tipIndexes.includes(cell.index),
                  })}
                  style={{
                    width: CELL_WIDTH,
                    height: CELL_WIDTH,
                    top: location.y * CELL_WIDTH,
                    left: location.x * CELL_WIDTH,
                  }}
                  data-x={location.x}
                  data-y={location.y}
                  onClick={(e) => handleClick(e, cell)}
                >
                  {tipIndexes.includes(cell.index) && !cell.flag && (
                    <img src={FLAG_SRC} />
                  )}
                  {cell.showMine && <img src={MINE_SRC} />}
                  {cell.showFlag && <img src={STATUS_TO_SRC[cell.flag]} />}
                  {(cell.showCount && cell.neighborMineCount) || ""}
                </div>
                {isEnd && <br />}
              </React.Fragment>
            );
          })}
        </div>
        <div className={styles.back} onClick={handleBack}>
          返回列表
        </div>
      </div>
    </div>
  );
};

export default Sweeper;
