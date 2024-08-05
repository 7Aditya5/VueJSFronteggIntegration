<template>
  <div id="app" v-if="fronteggLoaded">
    <div v-if="authState.user">
      <div><img :src="authState.user.profilePictureUrl"></div>
      <span>Logged in as: {{ authState.user.name }}</span>

      <button v-on:click="showAdminPortal">Settings</button> 

      
      <!-- <div>
        <label for="tenant-switcher">Switch Tenant: </label>
          <div v-if="authState.tenantsState.tenants && authState.tenantsState.tenants.length">
            <select id="tenant-switcher" v-model="selectedTenant" @change="switchTenant">
              <div v-for="tenant in authState.tenantsState.tenants" :key="tenant.tenantId">
                
                  <option :value="tenant.id">{{ tenant.name }}</option>
                
              </div>
          </select>
          </div>
      </div> -->
      <br />
      <button v-on:click="logout">Logout</button>
    </div>
    
    <div>
      <!-- <button v-if="authState.user" v-on:click="showAccessToken"> 
        What is my access token?
      </button>-->
      <button v-if="!authState.user" v-on:click="goToLogin">Login/SignUp</button>
    </div>
  </div>
</template>

<script>
import {
  useFrontegg,
  ContextHolder,
  AdminPortal
} from "@frontegg/vue";

export default {
  setup() {
    const { fronteggLoaded, authState, loginWithRedirect, useFronteggAuthGuard } = useFrontegg();

   // useFronteggAuthGuard(); // auto redirects the user to the login page / application
    console.log(authState)
    
    //const tenants = authState.tenantsState.tenants 

    const goToLogin = () => {
      loginWithRedirect();
    };

    const logout = () => {
      const baseUrl = ContextHolder.getContext().baseUrl;
      window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
    };

    const showAccessToken = () => {
      alert(authState.user.accessToken);
    };

    const showAdminPortal = () => {
      AdminPortal.show();
    };

    const switchTenant = () => {
      // Use this.authState.user.tenantIds to get the tenants the user is a member of
      this.fronteggAuth.tenantsActions.switchTenant({ tenantId: 'new-tenant-id' });
    }
    

    return {
      fronteggLoaded,
      authState,
      goToLogin,
      logout,
      showAccessToken,
      showAdminPortal,
      switchTenant,
    };
  },
};
</script>