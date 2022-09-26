import { SweeperSize } from "./model";

export const enum SweeperLevel {
  EASY = "easy",
  MIDDLE = "middle",
  HARD = "hard",
}

export const SweeperSizeMap: Record<SweeperLevel, SweeperSize> = {
  [SweeperLevel.EASY]: [9, 9],
  [SweeperLevel.MIDDLE]: [16, 16],
  [SweeperLevel.HARD]: [30, 16],
};

export const SweeperMineCountMap: Record<SweeperLevel, number> = {
  [SweeperLevel.EASY]: 10,
  [SweeperLevel.MIDDLE]: 40,
  [SweeperLevel.HARD]: 99,
};

export const SWEEPER_FLAG_STATUS = {
  NONE: 0,
  MINE: 1,
  QUESTION: 2,
  NOT_MINE: 3,
};

export const CONTROL_LEVEL_BUTTONS = [
  {
    level: SweeperLevel.EASY,
    text: "基础",
  },
  {
    level: SweeperLevel.MIDDLE,
    text: "中级",
  },
  {
    level: SweeperLevel.HARD,
    text: "高级",
  },
];

export const TIP_SVG_BASE_64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABY1JREFUaEPtmXuIVGUYxn/vWXfnjLVZWcYmGNV6KSydGTE1SqGS/Ce1osToTnTBEAW7WFmkmSmSJHaBqCgiSAil+w2FJPMyZ8b1WlmiXdAo0w2db/Zy3jjHM7a76cw5c1bM8Pw1s+d53/d5vvfyfd+scII/coLz56SA453Bkxn4X2WgPqNntcIElOGqDBI4W4UDKAfFYjMu6+psljWvlr3dJbxbSqhumA4Wl6dEGY/QowK5FoUPtJ1ZLRtkc1wh8QQ0aiJZz3wVpgBWJDJKmwhLCoaH2CItkWw7gKsWcMplek5bKx8KZDr4cxVWWbBMlSYVduIiIpwnFkNdlwkijIJ/xrcLX9fWcv2BNbKnGhFVCagfrr3bWlmhwiWloALvt1vMbFkvm8oR8crNclkAXNvBtqngMpq87IsqogoBKnaaz4Gr/GBKq1pMLWblpSjBEyl9UGAhQm1g96VxGAviRvETWYAfWHghIN8uwuSCI+9GCVrCJlM6SYW3S/2jwgNRFyKagMu1PlFgl8DpgYDZJiezqiFfsrFT+jTCE4G//aaOfqyR5rA+IwlIpnWGwvwg2DZTZEicCeL7adSEfRobgIHeV4FpBUcWHRMBdlo3AoMD53caR94IG6gczk7p3QivBphNxpHDw6GS/9AZ6JnSc13hZ3+RlIKx6c1qKVQKEOr9SE3ahr0ItjcWamppCDtWQwuoG6rjLYtlAaEvjCPXVCQ3Rj1CsFJMJayd0hUIYzyct1+05GV5JZug5MLAIJHWKQKLfSOXJYW8eLtv2cdO66e47DN5uTkE9mXgXg+ncF/RkVcq2UQSYKf0cYTZQQNXnD5Byf2E8qTJyZxKZOyUzkV41McJM01Wnq1kE0lAIqNTRfGng7osKuZlWrkApYmlLgOKefm+EplkSl9U4X7ff4T9IHQP2BmdjPqbjpfiZUVHJpYjlchoTl1MS05GViLvvU+mdbnCdd5nS5h4MCulfitrHlpAYpgOFJdtvgBlTzFHA4geyXtiqPYXi+9QmlF+x8IgjDNZ2XVENmO0R6KZ3wTO8JsYLm5xZGsY4aEFeIlNpNkt0McXYTG2uF68M9G/n4z2SipzFOpQrgT619TR92ij0U7p1Yh/vvLY/2jycmEY8pF6wAMnMrpQlOmB80+MI+MqBbIz+i3KrnJjN5HWlQKjw/ZXx5gRMgCJITpALLYg1ATqbyg48t7RRPTMaNpVsgj3mKyUdtpO8GRKb1RhafDHIm1cZJpkR6WFKb2PJCBotsWKfwPzurnZFa5ocaTpSAHtjM7DZXptLQ1/rZU/umLqMjrIcvkGodchdzxfdKSU4VAaIgsgo70SLk0i9AuC7uxRw4gD62R314h2Rr1V72myMrnru1Mv1T5tFquxuCB4tz3RyvD9G+XPUMwDUHQBgH+ramdVaeVQ1ppGRrFU2sMFV6suzVcW/vWylMkRYSdP1T3Q0dCfHPBR6UYVZfu303oH8HpAvs2b/8WcfBxOfGdUVRkouUim9GEV5gVEfjA5aQxDwk7pVoRBPlaYZbJy6IhSxRNLgH8ZqedXhDO92DUuqQN5yZfjEVzqvXuFVzr7jU1DnGN5PAGAndZ3gEkBodtNTt4sJ8BO6a0IJcxS48hNVSz8YZP4AjqeIqMyEZ4zWXkkqlm3NHHJiZ3WmcAzVZJ4zDgyt0rboIXiWHvHi7Q2ivAZyvmRXAk7VBlbdGR7JLsu4NglFCd4d9h2gwD/l7pbROkbhZAKvxjHu18c+Uge1ldsAV2mSti4h3DKbSYnb0Uz6ow+KcC76HglhPJahx9qyy+q0opw13+ihA6PU28/gBkV/0OjtAELTE688Rv7iV1CR2PQqTe6odaPFueYCThcWkB3lMpxEBC7OkI5OIYZCBU/NuikgNhLGNPB3ztKAE/NwPs8AAAAAElFTkSuQmCC";
