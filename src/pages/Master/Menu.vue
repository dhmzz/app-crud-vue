<script setup>
    import {useMenuStore} from "@/stores/master/master-menu-store.js";
    import RowMenu from "@/components/RowMenu.vue"
    import { ElMessage } from 'element-plus'
    import { ref } from 'vue'

    const searchKey = ref('');
    const MenuStore = useMenuStore();

    const handleAdd = () => {
        MenuStore.dialog.visible = true;
        MenuStore.dialog.title = 'Add Menu';
        MenuStore.dialog.isCreate = true;
    }

    const handleSubmit = () => {
        if(MenuStore.menu.name == ''){
            ElMessage.warning('Menu name is required!');
            return
        }

        if(MenuStore.menu.description == ''){
            ElMessage.warning('Description name is required!');
            return
        }
        if(MenuStore.menu.price == 0){
            ElMessage.warning('Price name is required!');
            return
        }

        if(MenuStore.menu.type == ''){
            ElMessage.warning('Type name is required!');
            return
        }

        MenuStore.submitSaveMenu();
    }
</script>

<template>
    <div class="sm:block md:flex md:justify-between">
        <div class="flex items-center w-full max-w-lg py-1 bg-white border border-gray-300 rounded-full shadow-sm">
            <input
                @keyup.enter='MenuStore.pagination.search = searchKey'
                type="text"
                placeholder="Please click enter to search data"
                v-model="searchKey"
                class="flex-grow px-4 text-gray-500 bg-transparent focus:outline-none !text-[12px]"
            />
            <div class="mr-3">
                <el-icon><Search /></el-icon>
            </div>
        </div>

        <div class="h-5 sm:hidden md:block">

        </div>

    
        <div class="sm:block">
            <el-button @click="handleAdd()" color="#E6AF5F" class="md:!mt-0 !flex !items-center !w-full !text-[12px] !sm:py-2 md:!py-1 !text-white !h-full !rounded-full !shadow-sm">
                <template #icon>
                    <el-icon size="small" class="mr-1"><Plus /></el-icon>
                </template>
                Add Menu
            </el-button>
        </div>
    </div>

    <div class="mt-20" v-if="MenuStore.menuListTotal > 0">
        <el-pagination 
            layout="prev, pager, next" 
            :total="MenuStore.menuListTotal" 
            :page-size="5" 
            v-model:current-page="MenuStore.pagination.currentPage"
        />
        <template v-for="menu in MenuStore.menuListFormatted">
            <div class="my-2">
                <RowMenu :menu="menu"/>
            </div>
        </template>
    </div>
    <div v-else>
        <div class="bg-white shadow-lg hover:shadow-2xl hover:duration-1000 rounded-md flex justify-center text-slate-500 items-center p-2 gap-3 mt-10">
        No Available Data
        </div>
    </div>

    <el-dialog
        v-model="MenuStore.dialog.visible"
        :title="MenuStore.dialog.title"
        width="500"
        :show-close='false'	
        :close-on-click-modal='false'
    >
        <el-form label-width="auto">
            <el-form-item label="Menu Name">
                <el-input v-model="MenuStore.menu.name" placeholder='Pecel Lele'/>
            </el-form-item>
            <el-form-item label="Description">
                <el-input type='textarea' v-model="MenuStore.menu.description" placeholder='Food that originated in Indonesia'/>
            </el-form-item>
            <el-form-item label="Price">
                <el-input type='number' v-model="MenuStore.menu.price" min='0'/>
            </el-form-item>
            <el-form-item label="Type">
                <el-select type='number' v-model="MenuStore.menu.type" placeholder='Please select type'>
                    <el-option value='food' label='Food'></el-option>
                    <el-option value='desert' label='Dessert'></el-option>
                    <el-option value='beverage' label='Beverage'></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <template #footer>
        <div class="dialog-footer">
            <el-button @click="MenuStore.dialog.visible = false, MenuStore.resetForm()" :disabled="MenuStore.dialog.isLoadingSave">Cancel</el-button>
            <el-button :disabled="MenuStore.dialog.isLoadingSave" color="#E6AF5F" type="primary" @click="handleSubmit()" class="!text-white">
                {{MenuStore.dialog.isLoadingSave ? 'Loading...' : 'Save'}}
            </el-button>
        </div>
        </template>
    </el-dialog>
</template>