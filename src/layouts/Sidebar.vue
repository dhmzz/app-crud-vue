<script setup>
  import { computed, ref } from "vue";
  import { useRoute } from "vue-router";

  const isOpen = ref(false); // State untuk toggle menu di mobile
  import LOGO from "@/assets/HASHMICRO_LOGO.png"
  import DASHBOARD from "@/assets/icons/Dashboard.svg"
  import MENU from "@/assets/icons/Menu.svg"

  const route = useRoute();
  const currentRoute = computed(() => route.name)

  const isTabActive = (name) => {
    console.log('cok')
    console.log(name, currentRoute.value)

    if(name == currentRoute.value){
      return '!bg-[#BC4E50]/12'
    }
  }

</script>

<template>
  <div class="bg-slate-200 flex flex-col min-h-screen">
        <!-- Navbar (Mobile) -->
        <nav class="bg-white shadow-md w-full p-4 flex items-center justify-between sm:hidden">
          <div>
            <img :src="LOGO" class="w-[50%] m-auto"/>
          </div>
          <button @click="isOpen = !isOpen" class="text-gray-700 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </nav>

        <!-- Navbar Menu (Mobile) -->
        <div v-if="isOpen" class="w-full bg-white shadow-md sm:hidden">
          <div class="flex flex-col p-4 space-y-2">
            <div>
              <router-link to="/dashboard" class="p-2 rounded-md hover:bg-gray-200 cursor-pointer flex gap-3 text-[#AF2F33]">
                <img :src="DASHBOARD" width="20px"/>
                <div>
                    Overview
                </div>
              </router-link>
              </div>
            <div>
              <router-link to="/master-menu" class="p-2 rounded-md hover:bg-gray-200 cursor-pointer flex gap-3 text-[#AF2F33]">
                <img :src="MENU" width="20px"/>
                <div>
                    Menu Data
                </div>
              </router-link>
            </div>
          </div>
        </div>
    
        <!-- Sidebar + Content (Desktop) -->
        <div class="flex flex-1">
            <aside class="bg-white w-45 p-4 shadow-xl hidden sm:block bg-slate-50s">
          <!-- Sidebar -->
            <div>
                <img :src="LOGO" class="w-[70%] m-auto"/>
            </div>
            <!-- <el-button>ppp</el-button> -->
            <div class="!text-[#AF2F33] mt-6 font-bold text-[14px]">DASHBOARD</div>
            <router-link 
                to="/dashboard" 
                class="
                    group flex justify-start items-center gap-1.5 py-2 pl-2 text-[12px] 
                    font-bold rounded-md hover:bg-[#BC4E50]/12 hover:duration-700 
                    cursor-pointer text-[#343A40] mt-3
                    "
                :class="isTabActive('Dashboard')"
              >
                <img :src="DASHBOARD" width="20px"/>
                <div>
                    Overview
                </div>
            </router-link>

            <div class="!text-[#AF2F33] mt-4 font-bold text-[14px]">MASTER</div>
            <router-link 
                to="/master-menu" 
                class="
                    group flex justify-start items-center gap-1.5 py-2 pl-2 text-[12px] 
                    font-bold rounded-md hover:bg-[#BC4E50]/12 hover:duration-700 
                    cursor-pointer text-[#343A40] mt-3
                    "
                :class="isTabActive('Master-Menu')"
                >
                <img :src="MENU" width="20px"/>
                <div>
                    Menu Data
                </div>
            </router-link>
          </aside>
    
          <!-- Main Content -->
          <main class="flex-1">
            <div class="sm:hidden md:flex w-full h-10 bg-white items-center text-[13px] font-semibold px-2 text-[#292939]">
            </div>
            <div class="p-3">
                <router-view />
            </div>
          </main>
        </div>
  </div>
</template>
