<script setup lang="ts"></script>

<template>
  <audio src=""></audio>
  <section class="audio-control">
    <div class="wrapper">
      <div class="left">
        []
      </div>
      <div class="middle">
        <div class="controllers">
          <svg class="iconfont pre-next-btn" aria-hidden="false">
            <use xlink:href="#icon-svgprevious"></use>
          </svg>
          <svg class="iconfont play-btn" aria-hidden="false">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg class="iconfont pre-next-btn" aria-hidden="false">
            <use xlink:href="#icon-svgnext"></use>
          </svg>
        </div>
        <div class="progress-field">
          <span class="current-time">0:00</span>
          <div class="bar">
            <div class="progress"></div>
          </div>
          <span class="duration">0:00</span>
        </div>
      </div>
      <div class="right">
        ---
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@media screen {
  .audio-control {
    width: 100%;
    height: 80px;

    .wrapper {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
      }

      .middle {
        width: 40%;
        .controllers {
          display: flex;
          justify-content: center;
          align-items: center;
  
          .play-btn {
            font-size: 30px;
            margin: 0 20px;
            padding: 8px;
            border-radius: 8px;
            transition: var(--el-transition-all);
            cursor: pointer;
  
            &:hover {
              background-color: var(--el-border-color-lighter);
            }
          }
  
          .pre-next-btn {
            font-size: 1.2rem;
            padding: 8px;
            border-radius: 8px;
            transition: var(--el-transition-all);
            cursor: pointer;
  
            &:hover {
              background-color: var(--el-border-color-lighter);
            }
          }
        }
        .progress-field {
          margin-top: 10px;
          display: flex;
          align-items: center;      
          span {
            font-size: 12px;
          }
          .bar {
            width: 100%;
            height: 5px;
            margin: 0 10px;
            border-radius: var(--el-border-radius-round);
            background-color: var(--el-border-color);
            .progress {
              height: 100%;
              width: 10%;
              border-radius: var(--el-border-radius-round);
              background-color: var(--el-text-color-placeholder);
            }
          }
        }
      }

      .right {
        display: flex;
      }
    }
  }

  @media (max-width: 768px) {
    .audio-control {
      display: none;
    }
  }
}
</style>
