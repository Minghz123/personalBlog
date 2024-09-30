<template>
  <div class="container">
    <div class="nav" @click="gotoFooter('header')">
      <SvgIcon name="arrowUp" color="white" width="20" height="20"></SvgIcon>
    </div>
    <!-- <canvas id="canvasDom" ref="canvasDom"></canvas> -->
    <header class="header" id="header">
      <span class="title">Ming</span>
      <button @click="changeLang">
        <SvgIcon class="switch" name="switch" width="25" height="25"></SvgIcon>
      </button>
    </header>

    <div class="first">
      <div class="left">
        <span class="title">{{ $t('title') }}</span>
        <span class="work">{{ $t('job') }}</span>
        <span class="mone">{{ $t('mone') }}</span>
        <button @click="gotoFooter('footer')" class="btn">
          {{ $t('contact') }}
          <SvgIcon name="fly" width="20" height="20" color="white"></SvgIcon>
        </button>
      </div>
      <div class="right">
        <div class="back"></div>
        <div class="rightPart part"></div>

        <div class="topPart part"></div>
        <div class="leftPart part"></div>
        <div class="bottomPart part"></div>
      </div>
    </div>

    <div class="second">
      <div class="top">
        <h1>{{ $t('aboutMe') }}</h1>
        <span>{{ $t('brief') }}</span>
      </div>
      <div class="bot">
        <div class="left">
          <img style="position: absolute; z-index: -1" src="/person.png" alt="" />
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
            {{ $t('skillIntroductionOne') }}<br />
            {{ $t('skillIntroductionTwo') }}
            <br />
            {{ $t('skillIntroductionThree') }}
            <br />
            {{ $t('skillIntroductionFour') }}
          </div>
        </div>
      </div>
    </div>

    <div class="fourth">
      <div class="top">
        <h1>{{ $t('exprience') }}</h1>
        <span>{{ $t('personalResume') }}</span>
      </div>
      <div class="bot">
        <div class="exprience">
          <section class="panel" ref="panel">
            <div class="flower">
              <div class="flower-box">
                <div class="core"></div>
                <div class="left">
                  <div
                    v-for="i in 10"
                    class="item"
                    :style="{ transform: 'rotate(' + 36 * i + 'deg)' + 'translate(-50%, -50%)' }"
                  ></div>
                </div>
              </div>
              <div class="ball"></div>
              <div class="box"></div>
              <div class="box-2"></div>
            </div>
            <div class="banner">
              <div class="from">
                <span class="fromItem" v-for="i in '我来自'">{{ i }}</span>
              </div>
              <div class="cn">惠 州</div>
              <div class="en">
                <div class="wordItem" v-for="(i, index) in 'HuiZhou'">
                  {{ i }}
                </div>
              </div>
            </div>
            <div class="sunCloud">
              <div class="cloud">
                <SvgIcon name="cloud" width="300" height="154"></SvgIcon>
              </div>
              <div class="sun"></div>
              <div class="sunLight"></div>
              <div class="sunLight light2"></div>
              <div class="sunLight light3"></div>
              <div class="plant">
                <div class="plant1 origin">
                  <SvgIcon name="plant1" width="215" height="152"></SvgIcon>
                </div>
                <div class="plant2 origin">
                  <SvgIcon name="plant2" width="150" height="154"></SvgIcon>
                </div>
              </div>
            </div>
            <div class="lakeLand">
              <div class="land">
                <SvgIcon class="landsvg" name="lake" width="600" height="308"></SvgIcon>
              </div>
              <div class="lake"></div>
            </div>

            <div class="school" ref="schoolRef">
              <div class="study">就读于</div>
              <div class="text">
                <div class="schoolText" v-for="i in '东莞理工学院'">{{ i }}</div>
              </div>
              <div class="profess">软件工程</div>
              <div class="date">
                <div>2021——2025</div>
                <div>Sep. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Jul.</div>
              </div>
              <div class="pic"></div>
              <div class="books">
                <SvgIcon name="books" width="200" height="200"></SvgIcon>
              </div>
              <div class="cup">
                <SvgIcon name="cup" width="200" height="200"></SvgIcon>
              </div>
            </div>

            <div class="work">
              <div class="workText">实习</div>
              <div class="job">前端开发</div>
              <div class="time">
                <div class="bar">
                  <div class="ring" v-for="i in 4"></div>
                </div>
                <div class="pageOne">
                  2023 Nov.
                  <div class="tips">{{ $t('start') }}</div>
                </div>
                <div class="pageTwo">
                  2024 &nbsp;Jun.
                  <div class="tips">{{ $t('end') }}</div>
                </div>
              </div>
              <div class="logo">
                <img src="/logo.png" alt="" />
              </div>
              <div class="roulette"></div>
              <div class="rolling">
                <div class="in">
                  <SvgIcon :name="icon[iconIndex]" width="50" height="50"></SvgIcon>
                  <span>{{ icon[iconIndex] }}</span>
                </div>
                <div class="out">
                  <SvgIcon :name="icon[outIndex]" width="50" height="50"></SvgIcon>
                  <span>{{ icon[outIndex] }}</span>
                </div>
              </div>
              <div class="building">
                <SvgIcon name="shenzhen" width="300" height="300"></SvgIcon>
              </div>
            </div>
            <!-- <div class="date">
              <div>2021——2024</div>
              <div>Nov. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Jun.</div>
            </div> -->
            <!-- <div class="building"></div> -->
          </section>
        </div>
      </div>
    </div>

    <footer class="footer" id="footer">
      <div class="name">
        <span>Ming</span>
        <span class="job">{{ $t('job') }}</span>
      </div>
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

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

import { useI18n } from 'vue-i18n';
import Radar from './components/Radar.vue';
import SvgIcon from '@/components/SvgIcon.vue';

const { t, locale } = useI18n();

let panel = ref();
let iconIndex = ref(0);
let outIndex = ref(4);
let icon = ['Vue', 'WX', 'JavaScript', 'Vite', 'TypeScript', 'Uniapp'];
onMounted(() => {
  playAnimation();
});

const playAnimation = () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Observer);

  gsap.to('.topPart', {
    rotateX: -45,
    yoyo: true,
    delay: 0.2,
    repeat: -1,
    repeatDelay: 2,
  });
  gsap.to('.bottomPart', {
    rotateX: 45,
    yoyo: true,
    delay: 0.3,
    repeat: -1,
    repeatDelay: 2,
  });
  gsap.to('.leftPart', {
    rotateY: -45,
    yoyo: true,
    delay: 0.1,
    repeat: -1,
    repeatDelay: 2,
  });
  gsap.to('.rightPart', {
    rotateY: 45,
    yoyo: true,
    delay: 0.2,
    repeat: -1,
    repeatDelay: 2,
  });

  gsap.to('.green', {
    // rotation: 360,

    translateX: 300,
    scale: 1.5,
    backgroundColor: 'red',
    scrollTrigger: { trigger: '.green', scrub: true },
  });

  let sections = gsap.utils.toArray('.panel');

  let scrollTween = gsap.to(sections, {
    xPercent: -50,

    ease: 'none', // <-- IMPORTANT!

    scrollTrigger: {
      trigger: '.fourth',
      pin: true,
      scrub: 0.1,

      end: '+=3000',
      onEnterBack() {
        gsap.to('.fourth', {
          backgroundColor: 'black',
          color: 'white',
        });
      },
    },
    onComplete() {
      gsap.to('.fourth', {
        backgroundColor: 'white',
        color: 'black',
      });
    },
  });

  gsap.to('.fourth', {
    backgroundColor: 'black',
    color: 'white',
    scrollTrigger: {
      trigger: '.flower',
      // pin: true,
      scrub: true,
    },
  });

  // gsap.to('.box-1', {
  //   // scale: 1.5,
  //   x: panel.value.clientWidth,
  //   // keyframes: {
  //   //   y: [0, -100, 200, -100],
  //   //   ease: 'none',
  //   // },
  //   ease: 'none',
  //   scrollTrigger: {
  //     trigger: '.box-1',
  //     containerAnimation: scrollTween,
  //     start: 'left center',
  //     scrub: 0.5,
  //     toggleActions: 'play none none reset',
  //     id: '1',
  //     end: `+=3000`,
  //   },
  // });
  // gsap.from('.item', {
  //   y: -200,
  //   stagger: 0.1,
  //   opacity: 0,
  //   scrollTrigger: {
  //     trigger: '.line',
  //     containerAnimation: scrollTween,
  //     start: 'center 100%',
  //     scrub: true,
  //     toggleActions: 'play none none reset',
  //     // id: '1',
  //     // end: `+=3000`,
  //   },
  // });
  // gsap.to('.box-2', {
  //   // scale: 1.5,
  //   duration: 0.5,
  //   // y: -120,
  //   ease: 'elastic',
  //   scrollTrigger: {
  //     trigger: '.box-2',
  //     containerAnimation: scrollTween,
  //     start: 'center 80%',
  //     end: 'center 20%',
  //     scrub: true,
  //     toggleActions: 'play none none reset',
  //     id: '2',
  //   },
  // });

  // gsap.to('.box-3', {
  //   scale: 1.5,
  //   duration: 2,
  //   ease: 'elastic',
  //   scrollTrigger: {
  //     trigger: '.box-2',
  //     containerAnimation: scrollTween,
  //     start: 'center 80%',
  //     end: 'center 20%',
  //     // scrub: true,
  //     toggleActions: 'play none none reset',
  //     id: '1',
  //   },
  // });

  let arr = [1.0, 0.6, 1.6, 1.2, 0.4, 1.8, 2, 0, 1.4, 0.2, 0.8];
  arr = arr.map((item) => item / 2);

  gsap.from('.core', {
    y: -300,
    duration: 0.5,
    scrollTrigger: {
      trigger: '.flower',
    },
    onComplete() {
      document.getElementsByClassName('flower')[0].getElementsByClassName('left')[0].style.opacity = 1;
      gsap.from('.item', {
        opacity: 0,
        scale: 0,
        stagger: function (index, target, list) {
          // your custom logic here. Return the delay from the start (not between each)
          return arr[index];
        },
        scrollTrigger: {
          trigger: '.item',
          // start: '+=20',
        },
        onComplete() {
          gsap.from('.flower-box', {
            keyframes: {
              rotate: [0, 20, 0, -20, 0],
            },
            duration: 1,
            ease: 'none',
          });
          gsap.to('.box', {
            x: 100,
            y: 150,
            scale: 0.5,
            duration: 1.5,
            delay: 0.3,
            ease: 'elastic',
            scrollTrigger: {
              trigger: '.box',
            },
            onComplete() {},
          });
          gsap.to('.box-2', {
            x: 180,
            y: 50,
            scale: 1,
            duration: 1.5,
            delay: 0.6,
            ease: 'elastic',
            scrollTrigger: {
              trigger: '.box-2',
            },
            onComplete() {},
          });
          gsap.to('.ball', {
            opacity: 1,
            x: 160,
            y: -150,
            onComplete() {
              gsap.to('.ball', {
                scale: 1.5,
                rotate: 360,
                duration: 2,
                // y: -120,
                ease: 'bounce',
                scrollTrigger: {
                  trigger: '.ball',
                  // containerAnimation: scrollTween,
                  // // start: 'center 80%',
                  // // end: 'center 20%',
                  // // scrub: true,
                  // toggleActions: 'play none none reset',
                  // id: '2',
                },
              });
            },
          });
        },
      });
    },
  });
  gsap.from('.banner', {
    opacity: 0,
    y: -300,
    duration: 0.8,
    ease: 'elastic',
    scrollTrigger: {
      trigger: '.banner',
      start: '+=20',
    },
    onComplete() {
      gsap.to('.fromItem', {
        keyframes: {
          '--color': ['#ffffff', '#0ae448', '#ffffff', '#0ae448'],
        },
        // '--color': '#0ae448',
        yoyo: true,
        stagger: 0.2,
        duration: 1,
      });
      gsap.to('.wordItem', {
        opacity: 1,
        y: 0,
        keyframes: {
          rotateX: [0, 90, -90, 0],
          ease: 'none',
        },
        duration: 0.3,
        stagger: 0.2,

        scrollTrigger: {
          trigger: '.banner',
        },
      });
    },
  });

  gsap.from('.sunCloud', {
    y: -300,
    ease: 'elastic',
    duration: 1,
    scrollTrigger: {
      trigger: '.sunCloud',
      start: '+=160',
    },
    onComplete() {
      gsap.to('.cloud', {
        x: 100,
        opacity: 1,
        duration: 0.5,
        ease: 'none',
      });
      document.getElementsByClassName('plant')[0].style.opacity = 1;
      gsap.from('.origin', {
        // zoom: 0,
        opacity: 0,
        y: 500,
        stagger: 0.2,
        duration: 0.5,
        scrollTrigger: {
          trigger: '.origin',
          // start: 'top center'
        },
      });
      gsap.to('.land', {
        rotateY: 0,
        duration: 1,
        ease: 'elastic',
        delay: 0.5,
        scrollTrigger: {
          trigger: '.land',
        },
        onComplete() {
          gsap.to('.sunLight', {
            duration: 2.5,
            opacity: 1,
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.5,
            // scale: 1,
          });
        },
      });
      gsap.to('.lake', {
        rotateX: 40,
        ease: 'elastic',
        delay: 0.3,
        duration: 1.2,
        scrollTrigger: {
          trigger: '.lake',
        },
      });
    },
  });

  //gsap.set('.school', { opacity: 0 });
  gsap.to('.pic', {
    rotateY: 0,
    ease: 'elastic',
    duration: 1.5,
    scrollTrigger: {
      trigger: '.pic',
      start: '+=400',
    },
  });
  gsap.from('.text', {
    y: -300,
    autoAlpha: 0,
    rotation: 0,
    // transformOrigin: '100% 50%',
    // opacity: 0,
    ease: 'elastic',
    duration: 1,
    scrollTrigger: {
      trigger: '.school',
      start: '+=700',
    },
    onComplete() {
      gsap.set(['.profess', '.date'], { opacity: 1 });
      gsap.to('.profess', {
        // rotate: 5,
        // scale: 0,
        keyframes: [
          { x: 0, y: 110, duration: 0.2 },
          { x: 190, y: 110, duration: 0.5, delay: 0.5 },
        ],
        ease: 'power1.out',
      });
      gsap.to('.date', {
        // rotate: -5,
        keyframes: [
          { x: 150, duration: 1 },
          { x: 450, duration: 0.5 },
        ],
        ease: 'power1.inOut',
        delay: 1,
      });
    },
  });
  gsap.to('.books', {
    rotateX: 0,
    yoyo: true,
    duration: 2,
    repeat: -1,
    repeatDelay: 0.5,
  });
  gsap.to('.cup', {
    rotateX: 180,
    yoyo: true,
    duration: 2,
    repeat: -1,
    repeatDelay: 0.5,
  });
  let a = 90;
  gsap.to('.work', {
    onComplete() {
      gsap.to('.job', {
        rotateX: 0,
        ease: 'bounce.out',
        duration: 1,
        scrollTrigger: {
          trigger: '.job',
          start: '+=2000',
        },
      });
      gsap.to('.roulette', {
        rotation: a,
        repeat: -1,
        duration: 1,
        repeatDelay: 0.5,
        onRepeat() {
          document.getElementsByClassName('roulette')[0].style.rotate = a + 'deg';
          a = (a + 90) % 360;
        },
      });
      gsap.to('.rolling', {
        rotate: 90,
        repeat: -1,
        duration: 1,
        repeatDelay: 0.5,
      });
      gsap.to('.in', {
        rotate: -90,
        repeat: -1,
        duration: 1,
        // ease: 'power4.out',
        opacity: 1,
        repeatDelay: 0.5,
        onRepeat() {
          iconIndex.value = (iconIndex.value + 1) % icon.length;
        },
      });

      gsap.to('.out', {
        // rotate: 90,
        repeat: -1,
        duration: 1,
        opacity: 0,
        // ease: 'power4.in',
        repeatDelay: 0.5,
        onRepeat() {
          outIndex.value = iconIndex.value - 1 < 0 ? icon.length - 1 : iconIndex.value - 1;
        },
      });
      gsap.from('.building', {
        keyframes: [
          { y: 0, duration: 0.01 },
          { opacity: 1, y: -150, duration: 0.3, transformOrigin: 'left bottom', rotate: -10 },
          { y: 5, duration: 1.2, ease: 'back.inOut' },
          { rotate: 0 },
          {
            transformOrigin: 'right bottom',
            rotate: 5,
          },
          { rotate: 0 },
          {
            transformOrigin: 'left bottom',
            rotate: -5,
          },
          { y: 0, rotate: 0 },
        ],
        ease: 'none',
        duration: 2.5,
        scrollTrigger: {
          trigger: '.building',
          start: '+=1700',
        },
      });
    },
    scrollTrigger: {
      trigger: '.work',
      start: '+=400',
    },
  });
  let spin = gsap.to('.time', {
    keyframes: {
      rotate: [0, 15, -15, 15, -15, 15, 0],
    },
    duration: 3,
    repeatDelay: 2,
    repeat: -1,
  });
  Observer.create({
    target: '.time',
    type: 'wheel, touch, pointer',
    onHover() {
      spin.pause();
      gsap.to('.time', {
        rotate: 0,
      });
      // gsap.killTweensOf('.time');
      gsap.to('.pageOne', {
        rotateX: -180,
        duration: 1,
        zIndex: 3,
      });
    },
    onHoverEnd() {
      spin.play();
      gsap.to('.pageOne', {
        rotateX: 5,
        duration: 1,
        zIndex: 1,
      });
    },
  });
};
const changeLang = () => {
  locale.value = locale.value == 'en_US' ? 'zh_CN' : 'en_US';
};

const gotoFooter = (id: string) => {
  let section = document.getElementById(id);
  if (section) {
    section.scrollIntoView();
  }
};
</script>

<style scoped lang="less">
@keyframes change {
  from {
    background: url('/realRain.gif');
  }
  49.9% {
    background: url('/realRain.gif');
  }
  50% {
    background: url('/rain.gif');
  }
  99.9% {
    background: url('/rain.gif');
  }
  to {
    background: url('/realRain.gif');
  }
}
.container {
  width: 100vw;
  height: 100vh;
  .nav {
    position: fixed;
    width: 30px;
    height: 30px;
    right: 3rem;
    top: 50%;
    border-radius: 0.5rem;
    background-color: cornflowerblue;
    .flex-mode();
  }
  .header {
    width: 100%;
    height: 80px;
    background-color: cornflowerblue;
    .flex-mode(row,space-around);
    .title {
      font-weight: bolder;
      color: white;
    }
    .switch {
      fill: #333333;
    }
    .switch:hover {
      fill: rgb(0, 87, 249);
    }
  }

  .first {
    width: 100%;
    height: 100%;
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
        gap: 1rem;
        padding: 1rem 2rem;
        background-color: cornflowerblue;
        border-radius: 0.625rem;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
      }
    }
    .right {
      background-color: #fe0000;
      .flex-mode(row,flex-start);
      position: relative;
      width: 40%;

      .part {
        position: absolute;
        width: 500px;
        height: 500px;
      }

      .back {
        position: absolute;
        width: 500px;
        height: 500px;
        //background: url('/rain.gif');
        animation: 20s change linear infinite;
      }
      .leftPart {
        background: url('/left.png');
        transform-origin: left;
        filter: drop-shadow(10px 0px 5px rgba(0, 0, 0, 0.5)) brightness(10);
      }
      .rightPart {
        background: url('/right.png');
        transform-origin: right;
        filter: drop-shadow(-10px 0px 1px rgba(0, 0, 0, 0.5)) brightness(10);
      }
      .topPart {
        background: url('/top.png');
        transform-origin: top;
        filter: drop-shadow(0px 10px 5px rgba(0, 0, 0, 0.5)) brightness(10);
      }
      .bottomPart {
        background: url('/bottom.png');
        transform-origin: bottom;
        filter: drop-shadow(0px -10px 5px rgba(0, 0, 0, 0.5)) brightness(10);
      }
    }
  }

  .second {
    width: 100%;
    height: 100%;
    .flex-mode(column);
    gap: 6rem;
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
        }
      }
    }
  }

  .third {
    width: 100%;
    height: 100%;
    .flex-mode(column);
    gap: 6rem;

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

  .fourth {
    width: 100%;
    height: 100%;
    .flex-mode(column);
    gap: 6rem;

    .top {
      .flex-mode(column);
      gap: 0.5rem;
      span {
        font-size: 1.25rem;
      }
    }
    .bot {
      width: 100%;
      height: 60%;
      .flex-mode(row);

      gap: 3.125rem;

      .exprience {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
        flex-wrap: nowrap;

        .panel {
          display: flex;
          align-items: center;
          gap: 20rem;
          flex-shrink: 0;
          width: 300vw;
          height: 100%;
          //background: linear-gradient(to right, black, rgb(66, 2, 34));
          //background-color: black;

          .flower {
            //transform: translateX(-15rem);
            position: relative;
            .flex-mode(row);
            margin-left: 10rem;
            .flower-box {
              .flex-mode(row);
              //position: absolute;
              .core {
                position: absolute;
                width: 70px;
                height: 70px;

                border-radius: 50%;
                background: radial-gradient(white, yellow);
                box-shadow: 0 0 20px rgba(189, 222, 98, 1);
                position: absolute;

                z-index: 1;
              }
              .left {
                width: 100px;
                height: 100px;
                opacity: 0;
                .item {
                  opacity: 1;
                  position: absolute;
                  width: 70px;
                  height: 70px;
                  background: linear-gradient(rgb(206, 138, 165) 0 10%, white);
                  box-shadow: 0 0 5px rgb(233, 233, 233);
                  border-radius: 0 100% 0 100%;
                }
              }
            }

            .box {
              position: absolute;
              transform: translate3d(6rem, 0, 0);
              clip-path: path('M15,45 A30,30,0,0,1,75,45 A30,30,0,0,1,135,45 Q135,90,75,130 Q15,90,15,45 Z');
              width: 10rem;
              height: 10rem;
              scale: 0;
              // border-radius: 0.5rem;
              background: radial-gradient(skyblue, purple);
            }
            .box-2 {
              position: absolute;
              transform: translate3d(6rem, 0, 0);
              clip-path: path(
                'M18.256 30.33c-1.001.211-2.038.322-3.1.322C6.786 30.651 0 23.79 0 15.325S6.785 0 15.155 0s15.156 6.862 15.156 15.326c0 .709-.048 1.406-.14 2.09h1.657c-.092-.684-.14-1.381-.14-2.09C31.689 6.862 38.475 0 46.845 0 55.214 0 62 6.862 62 15.326S55.214 30.65 46.844 30.65c-.94 0-1.862-.086-2.755-.252V31.6a15.083 15.083 0 0 1 2.755-.252C55.214 31.349 62 38.21 62 46.674 62 55.138 55.214 62 46.844 62c-8.37 0-15.155-6.862-15.155-15.326 0-1.074.11-2.123.317-3.135h-1.945c.164.904.25 1.835.25 2.787 0 8.464-6.785 15.326-15.155 15.326S0 54.79 0 46.326 6.785 31 15.155 31c1.063 0 2.1.11 3.1.321v-.99Z'
              );
              width: 4rem;
              height: 4rem;
              scale: 0;
              // border-radius: 0.5rem;
              background: radial-gradient(rgb(154, 228, 210), rgb(90, 204, 253));
            }
            .ball {
              width: 50px;
              height: 50px;
              position: absolute;
              //transform: translate3d(6rem, 0, 0);
              clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
              background: linear-gradient(45deg, #d7c21f, rgb(113, 23, 158));
              opacity: 0;
            }
          }

          .banner {
            .flex-mode(column);
            position: relative;
            white-space: nowrap;
            //transform: translateX(-10rem);
            font-weight: bold;
            .from {
              position: absolute;
              font-size: 2.5rem;
              transform: translate(-5rem, -7rem);

              .fromItem {
                --color: #ffffff;
                color: var(--color);
              }
            }

            .cn {
              // position: absolute;
              background: linear-gradient(-45deg, rgb(94, 108, 218), hotpink, purple);
              font-size: 2.5rem;
              color: white;
              border-radius: 1rem;
              padding: 2rem 6rem;
              z-index: 1;
            }

            .en {
              //position: absolute;
              transform: translate(6rem, 0rem);
              color: white;
              font-size: 2.5rem;
              .wordItem {
                display: inline-block;
                opacity: 0;
              }
              .wordItem:nth-child(2n) {
                transform: translateY(5rem);
              }
              .wordItem:nth-child(2n-1) {
                transform: translateY(-5rem);
              }
            }
          }
          .sunCloud {
            .flex-mode(row);
            position: relative;
            z-index: 3;
            transform: translate(-10rem, -10rem);
            .sun {
              position: absolute;
              width: 100px;
              height: 100px;
              border-radius: 50%;
              background: linear-gradient(to right bottom, rgb(240, 65, 6), rgb(213, 144, 155));
            }
            .cloud {
              position: absolute;
              z-index: 2;
              transform: translate(15rem, 2rem);
              opacity: 0;
            }
            .sunLight {
              width: 350px;
              height: 350px;
              position: absolute;
              z-index: 1;
              transform: translate(14rem, 15rem);
              // scale: 0;
              opacity: 0;
              background: linear-gradient(to right bottom, transparent, rgb(248, 235, 183), transparent 70%);
              clip-path: polygon(0 5%, 70% 100%, 100% 100%, 100% 70%, 5% 0%);
            }
            .light2 {
              position: absolute;
              transform-origin: left top;
              z-index: 0;
              transform: translate(13rem, 15rem) rotate(25deg) scale(0.7);
            }
            .light3 {
              position: absolute;
              transform-origin: left top;
              z-index: 0;
              transform: scale(0.3) translate(55rem, 50rem) rotate(-20deg);
            }
            .plant {
              position: absolute;
              transform: translate(0, 15rem);

              opacity: 0;
              z-index: -1;
              .origin {
                position: absolute;
                //zoom: 0.15;
                opacity: 1;
              }
              .plant1 {
                position: absolute;
                z-index: 1;
                transform: translateX(-5rem) rotate(-25deg);
              }
              .plant2 {
                position: absolute;
                // zoom: 0.3;

                z-index: 0;
                transform: translate(3rem, -2rem) scale(2);
              }
            }
          }

          .lakeLand {
            position: relative;
            z-index: 0;
            transform: translate(-18rem, 1rem);

            .land {
              position: absolute;
              clip-path: circle(30rem at left center);
              transform: translate(-7rem, -6rem) rotateY(90deg);

              .landsvg {
                filter: hue-rotate(90deg);
                //filter: drop-shadow(16px 16px 20px rgb(67, 36, 36)) invert(75%);
                fill: #114544;
              }
            }

            .lake {
              position: absolute;
              z-index: -1;
              transform: translate(-5rem, 2rem) rotateX(90deg);
              width: 400px;
              height: 200px;
              background: linear-gradient(skyblue, white);
              //clip-path: ellipse(closest-side farthest-side);
              clip-path: ellipse(50% 60%);
            }
          }
          .school {
            color: white;
            position: relative;
            top: -5rem;
            font-size: 2.5rem;
            .flex-mode(column,center,flex-start);
            font-weight: bold;
            white-space: nowrap;
            .study {
              position: absolute;
              top: -8rem;
              left: -5rem;
            }
            .text {
              position: absolute;

              padding: 2rem 5rem;
              background: linear-gradient(to right, #ff69b4, #9370db, #4169e1);

              border-radius: 1rem;
              transform: translate(-8rem, 0);

              box-shadow: 0px 20px 0px rgba(0, 0, 0, 0.5);
              z-index: 1;

              .schoolText {
                display: inline-block;
              }
            }
            .profess {
              position: absolute;
              z-index: 0;
              padding: 2rem 5rem;
              background: hotpink;
              color: black;
              font-weight: bold;
              box-shadow: 0px 10px 0px rgba(0, 0, 0, 0.5);
              //transform: translate(-5rem, 0rem);
              border-radius: 1rem;
              opacity: 0;
            }
            .date {
              position: absolute;
              color: black;
              z-index: -1;
              padding: 1rem 5rem;
              left: -5rem;
              background: linear-gradient(-35deg, rgb(255, 247, 0), rgb(0, 255, 4), rgb(255, 255, 105));
              // transform: translate(-7rem, 5rem);
              font-size: 1.5rem;
              border-radius: 1rem;
              opacity: 0;
              font-weight: bold;
            }
            .pic {
              position: absolute;
              z-index: 3;
              top: 6.5rem;
              left: -10rem;
              transform: rotateY(90deg);
              transform-origin: left;
              width: 500px;
              height: 200px;
              background: url('/dgut.png');
              background-size: cover;
            }
            .books {
              position: absolute;
              z-index: 3;
              top: 5rem;
              left: 40rem;
              transform: rotateX(180deg);
              backface-visibility: hidden;
            }
            .cup {
              position: absolute;
              z-index: 3;
              top: 5rem;
              left: 40rem;
              backface-visibility: hidden;
            }
          }
          .work {
            position: relative;
            margin-left: 40rem;
            .logo {
              width: 200px;
              height: 50px;
              position: absolute;
              z-index: 4;
              left: 2rem;
              top: -6rem;
              box-shadow: 5px 10px 0px rgba(0, 0, 0, 0.5);
              rotate: 10deg;
              background-color: #114544;
              padding: 0.5rem 2rem;
              border-radius: 0.4rem;

              img {
                width: 100%;
                height: 100%;
              }
            }
            .workText {
              position: absolute;

              white-space: nowrap;
              color: white;
              font-size: 2rem;
              top: -5rem;
              left: -3rem;
              padding: 2rem 5rem;
              background-color: hotpink;
              box-shadow: 5px 10px 0px rgba(0, 0, 0, 0.5);
              font-weight: bold;
              border-radius: 1rem;
              z-index: 3;
            }
            .job {
              color: black;
              background-color: #ff8709;
              padding: 0.5rem 2rem;
              position: absolute;
              top: 1.5rem;
              left: 2rem;
              font-weight: bold;
              white-space: nowrap;
              border-radius: 0.5rem;
              z-index: 2;
              transform-origin: top;
              transform: rotateX(-90deg);
              font-size: 2rem;
            }
            .time {
              cursor: pointer;
              position: absolute;
              z-index: 3;

              top: -10rem;
              left: 23rem;
              white-space: nowrap;
              overflow: visible;
              color: white;
              font-weight: bold;
              .bar {
                position: relative;
                z-index: 2;
                .flex-mode(row,space-around,center);
                height: 2rem;
                background-color: #efc083;
                box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.5);
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
                .ring {
                  transform: translateY(-1rem);
                  width: 0.2rem;
                  height: 1.5rem;
                  background-color: gray;
                  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
                }
              }
              .tips {
                position: absolute;
                bottom: 0.5rem;
                left: 0.5rem;
              }
              .pageOne {
                position: absolute;
                //background-color: #671111;
                background: linear-gradient(to right bottom, #dc219b, #4d2dc1, #a506e4);
                padding: 2rem;
                transform: rotateX(5deg);
                transform-origin: top;
                z-index: 1;
                clip-path: polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%);
                box-shadow: 10px 2px 2px rgba(0, 0, 0, 0.5);
                border-bottom-left-radius: 1rem;
                border-bottom-right-radius: 1rem;
              }
              .pageTwo {
                position: relative;
                background: linear-gradient(to right bottom, #21dc9e, #4d2dc1, #06e4e4);
                padding: 2rem;
                border-bottom-left-radius: 1rem;
                border-bottom-right-radius: 1rem;
              }
            }
            .roulette {
              position: absolute;
              background: url('/star.png');
              background-size: cover;
              width: 100px;
              height: 100px;
              left: 35rem;
              top: -2rem;
            }
            .rolling {
              position: absolute;
              left: 35rem;
              top: -2rem;
              width: 100px;
              height: 100px;
              .flex-mode();
              font-weight: bold;
              font-size: 2rem;

              .in {
                .flex-mode();
                gap: 1rem;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(0, -100%);
                white-space: nowrap;
                z-index: 1;
                color: white;
                rotate: 0deg;
                transform-origin: left;
                opacity: 0;
              }
              .out {
                .flex-mode();
                gap: 1rem;
                white-space: nowrap;
                position: absolute;
                //rotate: 0deg;
                top: 50%;
                left: 125%;
                transform: translate(0, -50%);
                z-index: 1;
                color: white;
                opacity: 1;
                transform-origin: left;
              }
            }
            .building {
              position: absolute;
              z-index: 3;
              top: -3rem;
              left: 10rem;
              opacity: 0;
            }
          }

          .line {
            width: 25rem;
            height: 200px;
            .flex-mode(row,space-between);
            transform: translateX(100rem);
            gap: 10px;
            .item {
              opacity: 1;
              width: 50px;
              height: 100%;
              background-color: aquamarine;
            }
          }
        }
        .panel2 {
          position: relative;
          z-index: 0;
        }
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
  }

  .footer {
    width: 100%;
    height: 150px;
    background-color: cornflowerblue;
    .flex-mode(row,center,center);
    gap: 2.5rem;
    position: relative;
    font-size: 1.25rem;
    .name {
      font-size: 2.5rem;
      position: absolute;
      top: 50%;
      left: 5rem;
      font-weight: bolder;
      transform: translateY(-50%);
      color: white;
      .flex-mode(column,center,flex-start);
      .job {
        font-size: 1.25rem;
      }
    }
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
</style>
