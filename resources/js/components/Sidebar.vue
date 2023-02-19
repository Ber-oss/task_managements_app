<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
   
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="index.html"
    >
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">Tasks management</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <router-link class="nav-link" :to="{name:'dashboard'}">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></router-link
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />
 
    <li class="nav-item">
      <router-link class="nav-link" :to="{name:'projects.index'}">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>Projects</span></router-link
      >
    </li>
    <li class="nav-item">
      <router-link class="nav-link" :to="{name:'tasks.index'}">
        <i class="fas fa-fw fa-table"></i>
        <span>Tasks</span></router-link
      >
    </li>
  </ul>
</template>

<script>

export default {  };
</script>

<style lang="scss" scoped>
</style>