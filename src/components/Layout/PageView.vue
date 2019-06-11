<template>
  <div class="page-view">
    <header-wrapper></header-wrapper>
    <div class="page-view__content">
      <div class="page-view__content-main main-scroll">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderWrapper from './Header.vue';
import { Getter, Action } from 'vuex-class';

@Component({
  components: {
    HeaderWrapper,
  },
})
export default class PageView extends Vue {

  private isCollapse: boolean = false;
  private isMobileCollapse: boolean = false;

}
</script>