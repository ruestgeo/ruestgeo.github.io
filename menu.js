/**
*
* Copyright 2017 Google Inc. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.


--revised by Geoffrey
*/

'use strict';

function toggleFadables (visible) {
  for (let elem of document.getElementsByClassName("fadable")){
    if (!visible && elem.classList.contains("fade-out")){
      elem.classList.remove("fade-out");
      elem.classList.add("fade-in");
    }
    else if (visible && elem.classList.contains("fade-in")) {
      elem.classList.remove("fade-in");
      elem.classList.add("fade-out");
    }
  }
}
function toggleFadable (elemId){
  let elem = document.getElementById(elemId);
  if (elem.classList.contains("fade-out")){
    elem.classList.remove("fade-out");
    elem.classList.add("fade-in");
  }
  else if (elem.classList.contains("fade-in")) {
    elem.classList.remove("fade-in");
    elem.classList.add("fade-out");
  }
}

function hamburger_toggle(x) {
  console.log("hamburger toggle on ["+x+"]");
  //event listener handles the toggle logic
}
function hamburger_reset(x){
  console.log("hamburger reset on ["+x+"]");
  setTimeout(function() {myMenu.recalculateMenu();}, 300);
}

class Menu {
  constructor (menu) {
    if ( !menu  ||  !(this._menu=document.getElementById(menu)) )
      this._menu = document.querySelector('.js-menu');
    this._menuContents = this._menu.querySelector('.js-menu-contents');
    this._menuToggleButton = this._menu.querySelector('.js-menu-toggle');
    this._menuTitle = this._menu.querySelector('.js-menu-title');

    this._expanded = true;
    this._animate = false;
    this._duration = 200;
    this._frameTime = 1000/60;
    this._nFrames = Math.round(this._duration / this._frameTime);
    this._collapsed;

    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    this.toggle = this.toggle.bind(this);

    this._calculateScales();
    this._createEaseAnimations();
    this._addEventListeners();

    this.collapse();
    this.activate();

  }

  recalculateMenu(){
    console.log('recalculating menu')
    this.deactivate();
    this.expand(); //this.immediate_expand();
    this._calculateScales();
    this._createEaseAnimations();
    this.collapse(); //this.immediate_collapse();
    this._menu.classList.remove('menu--expanded');
    this._menu.classList.remove('menu--scroll');
    this._menuContents.classList.remove('menu__contents--expanded');
    this._menu.classList.add('menu--collapsed');
    this._menuContents.classList.add('menu__contents--collapsed');
    console.log(this._expanded);
    this.activate();
  }

  activate () {
    this._menu.classList.add('menu--active');
    this._animate = true;
  }

  deactivate (){
    this._menu.classList.remove('menu--active');
    this._animate = false;
  }

  collapse () {
    if (!this._expanded) {
      return;
    }
    this._expanded = false;
    const {x, y} = this._collapsed;
    const invX = 1 / x;
    const invY = 1 / y;
    this._menu.style.transform = `scale(${x}, ${y})`;
    this._menuContents.style.transform = `scale(${invX}, ${invY})`;
    this._menuToggleButton.classList.remove('hamburger_change');
    if (!this._animate) {
      return;
    }
    this._applyAnimation({expand: false});
  }


  expand () {
    if (this._expanded) {
      return;
    }
    this._expanded = true;
    this._menu.style.transform = `scale(1, 1)`;
    this._menuContents.style.transform = `scale(1, 1)`;
    this._menuToggleButton.classList.add('hamburger_change');
    if (!this._animate) {
      return;
    }
    this._applyAnimation({expand: true});
  }

  /*
  immediate_expand(){
    console.log("immediate expand");
    var e = document.getElementsByClassName('menu__contents')[0];
    console.log("aniDur "+window.getComputedStyle(e,null).getPropertyValue('animation-duration'));
    var original = window.getComputedStyle(e,null).getPropertyValue('animation-duration');
    e.style.setProperty('animation-duration', 0+"s", null); //window.getComputedStyle(e,null).setProperty('animation-duration', 0);
    console.log("aniDur "+window.getComputedStyle(e,null).getPropertyValue('animation-duration'));
    this.expand();
    e.style.setProperty('animation-duration', original, null); //window.getComputedStyle(e,null).setProperty('animation-duration', original);
    console.log("aniDur "+window.getComputedStyle(e,null).getPropertyValue('animation-duration'));
  }
  immediate_collapse(){
    console.log("immediate collapse");
    var e = document.getElementsByClassName('menu__contents')[0];
    console.log("aniDur "+window.getComputedStyle(e,null).getPropertyValue('animation-duration'));
    var original = window.getComputedStyle(e,null).getPropertyValue('animation-duration');
    e.style.setProperty('animation-duration', 0+"s", null); //window.getComputedStyle(e,null).setProperty('animation-duration', 0);
    console.log("aniDur "+window.getComputedStyle(e,null).getPropertyValue('animation-duration'));
    this.collapse();
    e.style.setProperty('animation-duration', original, null); //window.getComputedStyle(e,null).setProperty('animation-duration', original);
    console.log("aniDur "+window.getComputedStyle(e,null).getPropertyValue('animation-duration'));
  }*/


  toggle () {
    toggleFadables(this._expanded);
    if (this._expanded) {
      this.collapse();
      return;
    }
    this.expand();
  }



  _addEventListeners () {
    this._menuToggleButton.addEventListener('click', this.toggle);
  }

  _applyAnimation ({expand}=opts) {
    this._menu.classList.remove('menu--expanded');
    this._menu.classList.remove('menu--collapsed');
    this._menu.classList.remove('menu--scroll');
    this._menuContents.classList.remove('menu__contents--expanded');
    this._menuContents.classList.remove('menu__contents--collapsed');

    // Force a recalc styles here so the classes take hold.
    window.getComputedStyle(this._menu).transform;

    if (expand) {
      this._menu.classList.add('menu--scroll');
      this._menu.classList.add('menu--expanded');
      this._menuContents.classList.add('menu__contents--expanded');
      return;
    }
    this._menu.classList.add('menu--collapsed');
    this._menuContents.classList.add('menu__contents--collapsed');
  }
  applyScroll(){
    this._menu.classList.add('menu--scroll');
  }
  removeScroll(){
    this._menu.classList.remove('menu--scroll');
  }



  _calculateScales () {
    const collapsed = this._menuTitle.getBoundingClientRect();
    const expanded = this._menu.getBoundingClientRect();

    this._collapsed = {
      x: collapsed.width / expanded.width,
      y: collapsed.height / expanded.height
    }
  }
  

  _createEaseAnimations () {
    let menuEase = document.querySelector('.menu-ease');
    if (menuEase) {
      //return menuEase;
      console.log("menu-ease already defined -> resetting");
      //menuEase.parentNode.removeChild(menuEase);
      document.head.removeChild(menuEase);
      
    }

    menuEase = document.createElement('style');
    menuEase.classList.add('menu-ease');

    const menuExpandAnimation = [];
    const menuExpandContentsAnimation = [];
    const menuCollapseAnimation = [];
    const menuCollapseContentsAnimation = [];

    const percentIncrement = 100 / this._nFrames;

    for (let i = 0; i <= this._nFrames; i++) {
      const step = this._ease(i / this._nFrames).toFixed(5);
      const percentage = (i * percentIncrement).toFixed(5);
      const startX = this._collapsed.x;
      const startY = this._collapsed.y;
      const endX = 1;
      const endY = 1;

      // Expand animation.
      this._append({
        percentage,
        step,
        startX,
        startY,
        endX,
        endY,
        outerAnimation: menuExpandAnimation,
        innerAnimation: menuExpandContentsAnimation
      });

      // Collapse animation.
      this._append({
        percentage,
        step,
        startX: 1,
        startY: 1,
        endX: this._collapsed.x,
        endY: this._collapsed.y,
        outerAnimation: menuCollapseAnimation,
        innerAnimation: menuCollapseContentsAnimation
      });
    }

    menuEase.textContent = `
    @keyframes menuExpandAnimation {
      ${menuExpandAnimation.join('')}
    }

    @keyframes menuExpandContentsAnimation {
      ${menuExpandContentsAnimation.join('')}
    }

    @keyframes menuCollapseAnimation {
      ${menuCollapseAnimation.join('')}
    }

    @keyframes menuCollapseContentsAnimation {
      ${menuCollapseContentsAnimation.join('')}
    }`;

    document.head.appendChild(menuEase);
    return menuEase;
  }

  _append ({
        percentage,
        step,
        startX,
        startY,
        endX,
        endY,
        outerAnimation,
        innerAnimation}=opts) {

    const xScale = (startX + (endX - startX) * step).toFixed(5);
    const yScale = (startY + (endY - startY) * step).toFixed(5);

    const invScaleX = (1 / xScale).toFixed(5);
    const invScaleY = (1 / yScale).toFixed(5);

    outerAnimation.push(`
      ${percentage}% {
        transform: scale(${xScale}, ${yScale});
      }`);

    innerAnimation.push(`
      ${percentage}% {
        transform: scale(${invScaleX}, ${invScaleY});
      }`);
  }

  _clamp (value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  _ease (v, pow=4) {
    v = this._clamp(v, 0, 1);

    return 1 - Math.pow(1 - v, pow);
  }
}

var myMenu = new Menu('navigation');
