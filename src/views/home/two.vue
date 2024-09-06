<template>
  <div class="container">
    <!-- <canvas id="canvasDom" ref="canvasDom"></canvas> -->
    <header class="header">
      <span>Ming</span>
      <button @click="changeLang">click</button>
    </header>
    <!-- <swiper
      direction="vertical"
      :mousewheel="(true as undefined)"
      :slidesPerView="1"
      :pagination="({ type: 'bullets', clickable: true } as undefined)"
      :scrollbar="({ draggable: true } as undefined)"
      :space-between="0"
      :modules="modules"
      @mouseenter="enter"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    > -->
    <!-- <swiper-slide class="swiperItem"> -->

    <div class="first">
      <div class="left">
        <span class="title">{{ $t('title') }}</span>
        <span class="work">{{ $t('job') }}</span>
        <span class="mone">{{ $t('mone') }}</span>
        <button class="btn"><img src="/vite.svg" alt="" /> {{ $t('hello') }}</button>
      </div>
      <div class="right">
        <img src="/loading.gif" alt="" />
      </div>
    </div>

    <div class="second">
      <div class="green"></div>
      <div class="top">
        <h1>{{ $t('aboutMe') }}</h1>
        <span>{{ $t('brief') }}</span>
      </div>
      <div class="bot">
        <div class="left">
          <img src="/loading.gif" alt="" />
        </div>
        <div class="right">
          <div class="word">
            {{ $t('introductionOne') }}<br />
            {{ $t('introductionTwo') }}
            <br />
            {{ $t('introductionThree') }}
            <br />
            {{ $t('introductionFour') }}
          </div>
        </div>
      </div>
    </div>

    <div class="third">
      <div class="top">
        <h1>{{ $t('skill') }}</h1>
        <span>{{ $t('masteryLevel') }}</span>
      </div>
      <div class="bot">
        <div class="left">
          <!-- <img src="/loading.gif" alt="" /> -->
          <Radar></Radar>
        </div>
        <div class="right">
          <div class="word">
            {{ $t('introductionOne') }}<br />
            {{ $t('introductionTwo') }}
            <br />
            {{ $t('introductionThree') }}
            <br />
            {{ $t('introductionFour') }}
          </div>
        </div>
      </div>
    </div>

    <!-- </swiper-slide> -->
    <!-- <swiper-slide class="swiperItem"> nihao2 </swiper-slide> -->
    <!-- <swiper-slide class="swiperItem"> nihao3 </swiper-slide> -->
    <!-- </swiper> -->
    <footer class="footer">
      <div class="msg wx">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3421">
          <path
            d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
            fill="#94BF67"
            p-id="3422"
          ></path>
        </svg>
        <div class="right">
          <span class="title">{{ $t('wx') }}</span>
          <span>L1355930186</span>
        </div>
      </div>

      <div class="msg mail">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5710">
          <path
            d="M838.954667 234.666667H170.666667c-3.626667 0-7.168 0.448-10.56 1.322666l323.690666 323.669334a21.333333 21.333333 0 0 0 30.165334 0L838.954667 234.666667z m46.144 14.186666l-260.693334 260.693334 262.933334 262.912c5.44-7.168 8.661333-16.106667 8.661333-25.792V277.333333c0-10.944-4.117333-20.906667-10.88-28.48zM843.861333 789.333333l-249.6-249.621333-50.133333 50.133333a64 64 0 0 1-90.517333 0l-50.112-50.133333L156.373333 786.88c4.48 1.578667 9.28 2.453333 14.314667 2.453333h673.194667zM128.661333 754.218667L373.333333 509.525333 129.578667 265.813333A42.709333 42.709333 0 0 0 128 277.333333v469.333334c0 2.56 0.213333 5.098667 0.661333 7.552zM170.666667 192h682.666666a85.333333 85.333333 0 0 1 85.333334 85.333333v469.333334a85.333333 85.333333 0 0 1-85.333334 85.333333H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V277.333333a85.333333 85.333333 0 0 1 85.333334-85.333333z"
            fill="#1296db"
            p-id="5711"
          ></path>
        </svg>

        <div class="right">
          <span class="title">{{ $t('mail') }}</span>
          <span>1355930186@qq.com</span>
        </div>
      </div>
      <div class="msg position">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="706">
          <path
            d="M512 249.976471c-99.388235 0-180.705882 81.317647-180.705882 180.705882s81.317647 180.705882 180.705882 180.705882 180.705882-81.317647 180.705882-180.705882-81.317647-180.705882-180.705882-180.705882z m0 301.17647c-66.258824 0-120.470588-54.211765-120.470588-120.470588s54.211765-120.470588 120.470588-120.470588 120.470588 54.211765 120.470588 120.470588-54.211765 120.470588-120.470588 120.470588z"
            fill="#2c2c2c"
            p-id="707"
          ></path>
          <path
            d="M512 39.152941c-216.847059 0-391.529412 174.682353-391.529412 391.529412 0 349.364706 391.529412 572.235294 391.529412 572.235294s391.529412-222.870588 391.529412-572.235294c0-216.847059-174.682353-391.529412-391.529412-391.529412z m0 891.482353C424.658824 873.411765 180.705882 686.682353 180.705882 430.682353c0-183.717647 147.576471-331.294118 331.294118-331.294118s331.294118 147.576471 331.294118 331.294118c0 256-243.952941 442.729412-331.294118 499.952941z"
            fill="#2c2c2c"
            p-id="708"
          ></path>
        </svg>
        <div class="right">
          <span class="title">{{ $t('position') }}</span>
          <span>{{ $t('detailPlace') }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { toRaw, onMounted, onUnmounted, ref } from 'vue';
// import { Swiper, SwiperSlide } from 'swiper/vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import 'swiper/css';
// import 'swiper/less/navigation';
// import 'swiper/less/pagination';
// import { Autoplay, Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';
import { useI18n } from 'vue-i18n';
import Radar from './components/Radar.vue';

const { t, locale } = useI18n();
// let modules = [Autoplay, Navigation, Pagination, Scrollbar, A11y, Mousewheel];

//定义swiperNew,目的获取非响应式swiper
let swiperNew: any;

onMounted(() => {
  // console.log();
  gsap.registerPlugin(ScrollTrigger);
  gsap.to('.green', {
    rotation: 360,
    translateX: 300,
    scale: 1.5,
    backgroundColor: 'red',
    scrollTrigger: { trigger: '.green', scrub: true },
  });
});

const changeLang = () => {
  locale.value = locale.value == 'en_US' ? 'zh_CN' : 'en_US';
};

//鼠标移入
const enter = () => {
  // swiperNew.autoplay.stop();
};
//鼠标移出
const leave = () => {
  swiperNew.autoplay.start();
};
const onSwiper = (swiper: any) => {
  // console.log(swiper);

  swiperNew = toRaw(swiper); //拿到swiper对象再转换为非响应式
};
const onSlideChange = () => {
  // console.log("slide change");
};
</script>

<style scoped lang="less">
@import '@/assets/styles/animate.min.css';

.container {
  width: 100vw;
  height: 100vh;

  .header {
    width: 100%;
    height: 150px;
    background-color: hotpink;
    .flex-mode();
  }

  .first {
    .br();
    width: 100%;
    height: 70%;
    .flex-mode();
    gap: 3.125rem;

    .left {
      width: 40%;

      .flex-mode(column,center,flex-end);
      gap: 0.625rem;
      text-align: left;

      .title {
        font-size: 40px;
        font-weight: 900;
        word-wrap: break-word;
      }
      .work {
        font-size: 20px;
        font-weight: 900;
        opacity: 0.7;
      }
      .mone {
        font-size: 1.25rem;
      }
      .btn {
        .flex-mode();
        gap: 1.5rem;
        padding: 1rem 2rem;
        background-color: cornflowerblue;
        border-radius: 0.625rem;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
      }
    }
    .right {
      .flex-mode(row,flex-start);
      width: 40%;

      img {
        width: 50%;
        height: 50%;
      }
    }
  }

  .second {
    width: 100%;
    height: 70%;
    .flex-mode(column);
    gap: 3rem;
    position: relative;
    .green {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100px;
      height: 100px;
      background-color: green;
      border-radius: 15%;
    }
    .top {
      .flex-mode(column);
      gap: 0.5rem;
      span {
        font-size: 1.25rem;
      }
    }
    .bot {
      width: 100%;
      .flex-mode(row);

      gap: 3.125rem;
      .left {
        .flex-mode(row);
        width: 40%;
      }
      .right {
        width: 40%;
        .flex-mode(column,center,flex-start);
        gap: 0.625rem;
        text-align: left;

        .word {
          font-size: 20px;
          font-weight: 900;
          opacity: 0.7;
        }
      }
    }
  }

  .third {
    width: 100%;
    height: 70%;
    .flex-mode(column);
    gap: 3rem;

    .top {
      .flex-mode(column);
      gap: 0.5rem;
      span {
        font-size: 1.25rem;
      }
    }
    .bot {
      width: 100%;
      height: 300px;
      .flex-mode(row);

      gap: 3.125rem;
      .left {
        .flex-mode(row);
        height: 100%;
        width: 40%;
      }
      .right {
        width: 40%;
        .flex-mode(column,center,flex-start);
        gap: 0.625rem;
        text-align: left;

        .word {
          font-size: 20px;
          font-weight: 900;
          opacity: 0.7;
        }
      }
    }
  }

  .footer {
    width: 100%;
    height: 150px;
    background-color: hotpink;
    .flex-mode(row,center,center);
    gap: 2.5rem;

    font-size: 1.25rem;
    .msg {
      .icon {
        width: 2rem;
        height: 2rem;
      }

      .flex-mode();
      gap: 0.625rem;
      .right {
        .flex-mode(column,center,flex-start);
        gap: 0.3125rem;
        .title {
          color: black;
          font-size: 1.5rem;
          font-weight: 900;
          opacity: 1;
        }
        opacity: 0.7;
      }
    }
    .wx {
    }
  }
}

:deep(.swiper-pagination) .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background-color: skyblue;
}

:deep(.swiper-pagination-bullet) {
  //修改分页器圆点大小
  width: 14px;
  height: 14px;
  background-color: #fff;
}

.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
:deep(.swiper-pagination-horizontal.swiper-pagination-bullets) .swiper-pagination-bullet {
  // 分页器远点之间的距离
  margin: 0 20px;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: rgb(229, 180, 127);
}
</style>
