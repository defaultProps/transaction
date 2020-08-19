<template>
  <div id="todo-checkbox">
    <input type="checkbox" id="checkbox" :value="checked" @change="$emit('todo-radiochange', $event.target.checked)">
    <svg viewBox="0 0 38 16">
      <path id="bg" d="M 7.2340776,0.79375 25.305335,2.303431 c 3.340746,0.2790873 6.051234,2.1696843 6.051234,5.5220673 0,3.3523827 -2.710489,5.2429797 -6.051234,5.5220667 L 7.2340776,14.857247 C 3.1241941,14.671597 0.52916667,11.177881 0.52916667,7.8254983 0.52916667,4.4731152 3.14652,1.0351291 7.2340776,0.79375 Z" />
      <path id="circle" d="m 13.682389,7.8092461 c 0,3.3960409 -2.734396,6.1534299 -6.1216329,6.1906119 -0.02309,2.54e-4 -0.04621,3.81e-4 -0.06936,3.81e-4 -3.4191911,0 -6.1909932,-2.771802 -6.1909934,-6.1909929 0,-3.4191912 2.7718022,-6.1909935 6.1909934,-6.1909933 0.01911,0 0.0382,8.66e-5 0.05727,2.594e-4 3.3928184,0.030745 6.1337234,2.790653 6.1337234,6.1907339 z" />
    </svg>
  </div>
</template>
<script>
export default {
  props: ['checked'],
  model: {
    prop: 'checked',
    event: 'todo-radiochange'
  },
  mounted() {
    this.handleClickCheckbox();
  },
  methods: {
    handleClickCheckbox() {
      const { gsap } = window;
      const circle = document.getElementById('circle')
      const bg = document.getElementById('bg')
      const checkbox = document.getElementById('checkbox')
      let isChecked = checkbox.checked;

      checkbox.addEventListener("pointerdown", e => {
        e.preventDefault();

        if (!isChecked) {
          gsap.to(circle, 0.2, {
            morphSVG:
            "m 23.207389,7.8092461 c 0,3.3960409 -2.734396,5.2583839 -6.121633,5.2955659 -0.02309,2.54e-4 -9.5712099,0.895427 -9.5943599,0.895427 -3.4191911,0 -6.1909932,-2.771802 -6.1909934,-6.1909929 0,-3.4191912 2.7718022,-6.1909935 6.1909934,-6.1909933 0.01911,0 9.5631999,0.8951161 9.5822699,0.8952889 3.392818,0.030745 6.133723,1.8956235 6.133723,5.2957044 z"
          });
        } else {
          gsap.to(circle, 0.2, {
            morphSVG:
            "m 8.8677422,7.8092461 c 0,3.3960409 2.7343958,5.2583839 6.1216328,5.2955659 0.02309,2.54e-4 9.571211,0.895427 9.594361,0.895427 3.419192,0 6.190995,-2.771802 6.190995,-6.1909929 0,-3.4191912 -2.771803,-6.1909935 -6.190995,-6.1909933 -0.01911,0 -9.563201,0.8951161 -9.582271,0.8952889 -3.392818,0.030745 -6.1337228,1.8956235 -6.1337228,5.2957044 z",
            x: 0
          });
        }
        isChecked = !isChecked;
      })
      checkbox.addEventListener("pointerup", () => {
        if (isChecked) {
          gsap.to(circle, 0.2, {
            morphSVG:
            "m 13.682389,7.8092461 c 0,3.3960409 -2.734396,6.1534299 -6.1216329,6.1906119 -0.02309,2.54e-4 -0.04621,3.81e-4 -0.06936,3.81e-4 -3.4191911,0 -6.1909932,-2.771802 -6.1909934,-6.1909929 0,-3.4191912 2.7718022,-6.1909935 6.1909934,-6.1909933 0.01911,0 0.0382,8.66e-5 0.05727,2.594e-4 3.3928184,0.030745 6.1337234,2.790653 6.1337234,6.1907339 z",
            x: 17
          });
          gsap.to(bg, 0.2, {
            morphSVG:
            "M 24.651658,0.7937995 6.5804018,2.3034742 C 3.2396563,2.5825604 0.52916883,4.4731385 0.52916883,7.8254985 c 0,3.3523605 2.70377397,5.3403985 6.05123297,5.5220215 l 18.0712562,1.509678 c 4.109882,-0.185649 6.704909,-3.679339 6.704909,-7.0316995 0,-3.35236 -2.617352,-6.790321 -6.704909,-7.031699 z"
          });
        } else {
          gsap.to(circle, 0.2, {
            morphSVG:
            "m 13.682389,7.8092461 c 0,3.3960409 -2.734396,6.1534299 -6.1216329,6.1906119 -0.02309,2.54e-4 -0.04621,3.81e-4 -0.06936,3.81e-4 -3.4191911,0 -6.1909932,-2.771802 -6.1909934,-6.1909929 0,-3.4191912 2.7718022,-6.1909935 6.1909934,-6.1909933 0.01911,0 0.0382,8.66e-5 0.05727,2.594e-4 3.3928184,0.030745 6.1337234,2.790653 6.1337234,6.1907339 z",
            x: 0
          });
          gsap.to(bg, 0.2, {
            morphSVG:
            "M 7.2340776,0.79375 25.305335,2.303431 c 3.340746,0.2790873 6.051234,2.1696843 6.051234,5.5220673 0,3.3523827 -2.710489,5.2429797 -6.051234,5.5220667 L 7.2340776,14.857247 C 3.1241941,14.671597 0.52916667,11.177881 0.52916667,7.8254983 0.52916667,4.4731152 3.14652,1.0351291 7.2340776,0.79375 Z"
          });
      }
      })
    }
  },
  beforeDestroy() {
    const checkbox = document.getElementById('checkbox')

    if (checkbox) {
      checkbox.onpointerdown = null;
      checkbox.onpointerup = null;
    }
  }
}
</script>
<style lang="scss">
#todo-checkbox {
  position: relative;
  display: inline;
  overflow: hidden;

  --todo-checkbox-width: 50px;
  --todo-checkbox-height: 32px;
  --todo-fill: #d1d6ee;
  --todo-fill-active: #275efe;
  input {
    position: absolute;
    display: block;
    width: var(--todo-checkbox-width);
    height: var(--todo-checkbox-height);
    padding: 0;
    margin: 0;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    outline: none;
    border: none;
    cursor: pointer;
    &:checked {
      & + svg {
        #bg {
          fill: var(--todo-fill-active);
        }
      }
    }
  }
  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 32px;
    pointer-events: none;
    #bg {
      fill: var(--todo-fill);
      transition: fill 0.2s ease;
    }
    #circle {
      fill: #fff;
    }
  }
}
</style>
