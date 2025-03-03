<script>
import { afterUpdate, onMount } from 'svelte';

import langs from '../../routes/index';

import Card from './Card.svelte';
import Progress from './Progress.svelte';
import ScrollTop from './ScrollTop.svelte';

let owner = '';
let currentOwner = '';
let data;
let langCount;
let repoCount;
let placeholder = '[ username / repo ]';
let done = false;
let active = false;

onMount(async () => {
  const windowOwner = `${window.location.pathname
    .split('/')
    .slice(1, 3)
    .join('/')}`;
  if (windowOwner && windowOwner.length > 0) {
    owner = windowOwner;
    await submit('window');
  }
});

afterUpdate(() => {
  const inputElement = document.querySelector('[name="input"]');
  if (inputElement) {
    inputElement.focus();
  }
});

const isDone = () => {
  done = true;
};

const getData = async (owner) => {
  try {
    const response = await langs(owner);
    return response.data;
  } catch (error) {
    return error;
  }
};

const submit = async (event) => {
  try {
    if (
      (event === 'window' || !event.key || event.key === 'Enter') &&
      owner.length > 0
    ) {
      if (event !== 'window') {
        event.target.blur();
      }
      done = false;
      data = undefined;
      langCount = undefined;
      repoCount = undefined;
      currentOwner = owner.replaceAll(' ', '');
      owner = '';
      const collectData = [];
      const allData = await getData(currentOwner);
      if (allData.allNames) {
        repoCount = allData.allNames.length;
      }
      if (allData.space) {
        const keys = Object.keys(allData.space);
        langCount = keys.length;
        for (const key of keys) {
          collectData.push({ name: key, percent: allData.space[key] });
        }
        collectData.sort((a, b) => b.percent - a.percent);
        data = collectData;
      }
    }
    return true;
  } catch (error) {
    return error;
  }
};

const input = (event) => {
  if (event.target.value) {
    active = true;
    placeholder = '';
  }
};

const click = () => {
  placeholder = '';
  active = true;
};

const blur = () => {
  placeholder = '[ username / repo ]';
  active = false;
};

const focus = () => {
  // active = true;
};
</script>

<template>
  <h5>
    View language usage per repo<br />or total by username
  </h5>
  <div id="input-area">
    <input
      name="input"
      tabindex="0"
      class:active
      type="text"
      placeholder="{placeholder}"
      autocorrect="off"
      autocapitalize="none"
      autocomplete="off"
      bind:value="{owner}"
      on:focus="{focus}"
      on:blur="{blur}"
      on:keydown="{submit}"
      on:input="{input}"
      on:click="{click}"
    />
    <button on:click="{submit}">Submit</button>
  </div>
  <div id="results">
    {#if currentOwner}
      <Card
        langCount="{langCount}"
        repoCount="{repoCount}"
        currentOwner="{currentOwner}"
        data="{data}"
      />
    {/if}
    {#if data}
      <table>
        <tbody id="tbody">
          {#if data.length > 0}
            {#each data as dat, index}
              <Progress
                dat="{dat}"
                index="{index}"
                langCount="{langCount}"
                isDone="{isDone}"
              />
            {/each}
          {:else}
            <h4>User Not Found</h4>
          {/if}
        </tbody>
      </table>
    {/if}
  </div>
  {#if done}
    <ScrollTop />
  {/if}
  <h6 id="footer">
    <a href="https://github.com/chiefmikey" target="_blank"
      >made by chiefmikey</a
    >
  </h6>
</template>

<style>
#input-area {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#results {
  width: 100%;
  padding: 0 0 10px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
