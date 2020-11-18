<template>
  <main class="not-found">
      <h1>
        This page can't be fond
      </h1>
      <p class="more-info">
        Sorry, but we can't find the page you're looking for.
        <br>
        It might have been moved or deleted.
        <br>
        Check your selling or click below to return to the homepage.
      </p>
      <div class="actions">
          <router-link tag="button" :to="{name:'home'}">Return to Home</router-link>
      </div>
  </main>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.more-info {
    text-align: center;
}
</style>